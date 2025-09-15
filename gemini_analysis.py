import os
import base64
import time
import requests
import json
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

# Set your Google API key
GOOGLE_API_KEY = "AIzaSyBzzXMz0CQdaMel5dlgxinSQavncO60WLQ"
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

class PlantImageAnalyzer:
    def __init__(self, image_folder, web_app_url=None):
        self.image_folder = image_folder
        self.web_app_url = web_app_url  # URL of your web application endpoint
        self.gemini_model = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

    def encode_image_to_base64(self, image_path):
        with open(image_path, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")

    def send_to_webapp(self, data):
        """Send analysis results to web application"""
        if not self.web_app_url:
            print("Web application URL not configured")
            return False
            
        try:
            headers = {
                'Content-Type': 'application/json'
            }
            response = requests.post(self.web_app_url, json=data, headers=headers, timeout=30)
            if response.status_code == 200:
                print(f"✅ Successfully sent data to web application")
                response_data = response.json()
                return response_data.get('id')
            else:
                print(f"❌ Failed to send data to web application: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Error sending to web application: {e}")
            return False

    def analyze_image(self, image_path):
        try:
            base64_image = self.encode_image_to_base64(image_path)

            prompt_text = (
                "You are an expert agricultural assistant. "
                "Analyze the image of this plant and provide the following:\n\n"
                "1. Name of the disease (if any)\n"
                "2. Description of symptoms\n"
                "3. Suggested treatment or medicine\n"
                "4. Probability/confidence score of the diagnosis\n"
                "5. Affected areas in the image (for heat mapping)\n\n"
                "Format your response as a JSON object with these keys: "
                "disease_name, symptoms, treatment, confidence_score, affected_areas."
            )

            message = HumanMessage(
                content=[
                    {"type": "text", "text": prompt_text},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
                    }
                ]
            )

            response = self.gemini_model.invoke([message])
            
            # Try to parse the response as JSON
            try:
                # Extract JSON from the response (Gemini might add some text around the JSON)
                json_str = response.content.strip()
                if '```json' in json_str:
                    json_str = json_str.split('```json')[1].split('```')[0].strip()
                elif '```' in json_str:
                    json_str = json_str.split('```')[1].split('```')[0].strip()
                
                analysis_data = json.loads(json_str)
                return analysis_data
            except json.JSONDecodeError:
                # If it's not valid JSON, return the raw text
                return {"raw_response": response.content.strip()}

        except Exception as e:
            return {"error": f"Error: {e}"}

    def process_image(self, image_path):
        image_name = os.path.basename(image_path)
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"🔍 Analyzing {image_name}...")
        
        # Analyze the image
        result = self.analyze_image(image_path)
        
        # Prepare data to send to web application
        webapp_data = {
            "timestamp": timestamp,
            "image_name": image_name,
            "analysis": result,
            "image_data": self.encode_image_to_base64(image_path),
            "status": "completed"
        }
        
        # Send to web application
        analysis_id = self.send_to_webapp(webapp_data)
        
        if analysis_id:
            print(f"✅ Processed {image_name} (ID: {analysis_id})")
            return analysis_id
        else:
            print(f"❌ Failed to process {image_name}")
            return False

    def run_analysis(self):
        # Check if image folder exists
        if not os.path.exists(self.image_folder):
            print(f"❌ Image folder '{self.image_folder}' does not exist")
            return
        
        image_files = [
            os.path.join(self.image_folder, f)
            for f in os.listdir(self.image_folder)
            if f.lower().endswith((".jpg", ".jpeg", ".png"))
        ]

        if not image_files:
            print(f"❌ No images found in '{self.image_folder}'")
            return

        print(f"🔍 Found {len(image_files)} images. Starting analysis...")

        for image_path in image_files:
            self.process_image(image_path)

        print("✅ Analysis completed")


if __name__ == "__main__":
    image_folder = "images"  # Folder where images are stored
    web_app_url = "http://localhost:3001/api/analysis"  # Your web app endpoint
    
    analyzer = PlantImageAnalyzer(image_folder, web_app_url)
    analyzer.run_analysis()