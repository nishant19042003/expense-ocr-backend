Expense OCR Backend

A backend service that extracts key expense details (date, amount, vendor, and payment method) from receipts in image or PDF format.
This project uses AWS Textract for OCR and applies custom parsing logic to structure the extracted data.

🚀 Features

📤 Upload receipts in image/PDF format

🔎 Extract text using AWS Textract

🧾 Parse and return structured details:

Vendor

Date

Amount

Payment Method

🌐 RESTful API built with Express & Node.js

🏗️ Modular and extendable architecture

🛠️ Tech Stack

Node.js

Express.js

AWS Textract

Multer (for file uploads)

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/nishant19042003/expense-ocr-backend.git
cd expense-ocr-backend


Install dependencies

npm install


Configure environment variables (create a .env file):

AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=your-region
PORT=3000


Start the server

npm start


👉 Server will run at: http://localhost:3000

📂 API Documentation
POST /api/upload

Upload a receipt (image or PDF) and extract structured details.

Content-Type: multipart/form-data

Parameter: file (receipt image/PDF)

✅ Sample Request
curl -X POST http://localhost:3000/api/upload \
  -F "file=@sample_receipt.pdf"

📌 Sample Response
{
  "success": true,
  "parsedData": {
    "vendor": "Walmart Supercenter",
    "date": "08/28/2025",
    "amount": "45.67",
    "paymentMethod": "Credit Card"
  }
}

🎯 Use Case

Perfect for:

📱 Expense tracking apps

💰 Finance automation systems

🗂️ Receipt management tools

Easily digitize and structure data from physical or digital receipts.

🚀 Deployment
🔹 Deploy on Render (Recommended)

Push your code to GitHub.

Go to Render
 → Create New → Web Service.

Connect your GitHub repo.

Set Build Command:

npm install


and Start Command:

npm start


Add environment variables from .env.

Deploy 🚀

👉 Example Live API: Expense OCR Backend on Render

🔹 Deploy with Docker

Create a Dockerfile:

FROM node:18  
WORKDIR /app  
COPY package*.json ./  
RUN npm install  
COPY . .  
EXPOSE 3000  
CMD ["npm", "start"]  


Build and run:

docker build -t expense-ocr-backend .
docker run -p 3000:3000 expense-ocr-backend

🔹 Deploy on AWS Elastic Beanstalk

Install AWS EB CLI:

pip install awsebcli


Initialize project:

eb init -p node.js-18 expense-ocr-backend


Deploy:

eb create expense-ocr-env
eb open


Add your AWS credentials & Textract permissions in environment variables.
