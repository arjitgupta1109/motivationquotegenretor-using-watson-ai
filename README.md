# 💬 Motivational Quote Generator using IBM Watsonx

A full-stack web application that generates personalized motivational quotes based on the user's current mood using IBM Watsonx AI (LLaMA-2 model).

## 🚀 Features

- 🔐 User Login / Signup with authentication
- 🎨 Modern, responsive UI (HTML, CSS, JS)
- 🤖 Mood-based motivational quote generation via IBM Watsonx
- 📦 Node.js + Express backend with secure API handling
- 🌐 Deployed using Render / localhost

## 🧠 How It Works

1. User logs in or registers on the homepage.
2. They enter a mood or emotion (e.g., \"stressed\", \"demotivated\") in the text field.
3. The input is sent to the backend server.
4. The backend generates a prompt and sends it to IBM Watsonx's LLaMA-2 model.
5. The AI returns a motivational message tailored to the user's mood.
6. The quote is displayed beautifully in the frontend.

## 🛠️ Tech Stack

### Frontend:
- HTML, CSS, JavaScript
- Ionicons for icons

### Backend:
- Node.js, Express.js
- `axios`, `cors`, `dotenv`, `qs`
- IBM Watson IAM Authentication + LLaMA-2 API

# 📁 Project Structure

/public
├── index.html
├── mood.html
├── style.css
├── script.js

server.js
users.json
.env
package.json

bash
Copy
Edit

## 📦 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/arjitgupta1109/motivationquotegenretor-using-watson-ai.git
   cd motivationquotegenretor-using-watson-ai
Install dependencies

bash
Copy
Edit
npm install
Configure environment variables

Create a .env file and add:

env
Copy
Edit
IBM_API_KEY=your_ibm_api_key_here
IBM_PROJECT_ID=your_ibm_project_id_here
PORT=3000
Run the server

bash
Copy
Edit
node server.js
Access the app
Open your browser and visit:
http://localhost:3000

✅ Live Demo
🔗 Live App on Render (if deployed)

🧪 Testing
Unit tests for auth and inputs

Integration test for Watsonx response flow

Manual testing of moods and response quality

🔮 Future Enhancements
Add language selection (e.g., Hindi, Tamil)

Save & view past quotes

Feedback/rating system for quotes

OAuth Login (Google/Facebook)

Voice-to-text mood input

👤 Author
Arjit Gupta
📧 arjit.gupta2023@vitstudent.ac.in
🎓 VIT Vellore Campus
