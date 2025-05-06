// File: /api/analyze-selfie.js

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the API key from environment variables
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    // Check if API key exists
    if (!GEMINI_API_KEY) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Get image data from request body
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: 'Analyze this selfie. Based on this, generate a one-paragraph, daily-horoscope-style message that feels personal, uplifting, and emotionally intelligent. Observe and gently interpret the expression of the person, clothing, lighting, and mood - and respond with a feel-good reflection. Start with a warm compliment, suggest what kind of energy or emotion they radiate today, hint at one or two light, joyful moments they might experience, and end with an encouraging suggestion (like showing kindness, smiling more, or embracing the day). Always stay positive, poetic, and emotionally soothing - never generic or templated. Respond purely based on the selfie - dont ask questions or offer advice.'
              },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: imageData
                }
              }
            ]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
      return res.status(200).json({ message: data.candidates[0].content.parts[0].text || 'You look amazing!' });
    } else if (data.error) {
      console.error('Gemini API error:', data.error);
      return res.status(500).json({ error: data.error.message || 'Unknown API error' });
    }

    return res.status(200).json({ message: 'You look fantastic today!' });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
