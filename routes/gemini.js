
const express = require('express');

const router = express.Router();

// Gemini API endpoint
router.post('/gemini', async (req, res) => {
  const { prompt } = req.body;
  
  console.log('\n🤖 GEMINI API REQUEST');
  console.log('==================');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Prompt:', prompt);
  console.log('==================\n');

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAfHYZ4RPOavnbAVnkEzGurKOYVW1U3RnE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    
    console.log('✅ GEMINI API RESPONSE');
    console.log('Response:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    console.log('==================\n');
    
    res.json({ text });
  } catch (error) {
    console.error('❌ GEMINI API ERROR:', error.message);
    res.status(500).json({ 
      text: 'Sorry, I encountered an error processing your request.', 
      error: error.message 
    });
  }
});

module.exports = router;
