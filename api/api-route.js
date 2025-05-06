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
                text: 'Analyze this selfie and generate a flattering, motivating compliment based on visual features like facial expression, lighting, or background. Keep it brief and positive, focusing on one or two noticeable features. Make the person feel good about themselves!'
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
