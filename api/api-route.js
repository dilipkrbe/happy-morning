// This file should be placed in the /api directory for Vercel serverless functions

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }
    
    // Get base64 data (remove data URL prefix if present)
    const base64Data = imageData.includes('base64,') 
      ? imageData.split('base64,')[1] 
      : imageData;
    
    // Call Gemini API
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
                  data: base64Data
                }
              }
            ]
          }]
        })
      }
    );

    const data = await response.json();
    
    // Return the Gemini API response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ 
      error: 'Failed to process the image',
      message: error.message
    });
  }
}
