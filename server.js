require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// === User Auth ===
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync('users.json'));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: "User already exists." });
  }
  users.push({ email, password });
  saveUsers(users);
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  res.json({ success: !!user });
});

// === IBM Token ===
async function getIBMIAMToken(apiKey) {
  const response = await axios.post(
    'https://iam.cloud.ibm.com/identity/token',
    qs.stringify({
      grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
      apikey: apiKey
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
  return response.data.access_token;
}

// === Motivation Generation ===
app.post('/generate', async (req, res) => {
  const { mood } = req.body;
  const prompt = `Generate a longer and encouraging motivational message (2–3 sentences) for someone who says: "${mood}". Focus on inspiration and positivity.`;

  try {
    const token = await getIBMIAMToken(process.env.IBM_API_KEY);
    const response = await axios.post(
      'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2024-05-01',
      {
        model_id: "meta-llama/llama-2-13b-chat",
        input: prompt,
        parameters: {
          decoding_method: "greedy",
          max_new_tokens: 250
        },
        project_id: process.env.IBM_PROJECT_ID
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const quote = response.data.results?.[0]?.generated_text?.trim() || "Stay strong. You're doing great!";
    res.json({ quote });

  } catch (err) {
    console.error("❌ IBM API Error:", err.response?.data || err.message);
    res.status(500).json({ quote: "Couldn't generate motivation. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
