# Selfie Compliment App

A simple web application that takes a selfie, processes it, and uses Google's Gemini API to generate a personalized compliment based on the image.

## Features

- Mobile-friendly design optimized for smartphones
- Camera access to take selfies
- Image downscaling for efficient API usage
- Integration with Google Gemini API for AI-powered compliments
- Progressive Web App (PWA) support for offline capability
- Privacy-conscious with user consent flow

## Requirements

To use and deploy this app, you'll need:

1. A Google Gemini API key from [AI Studio](https://aistudio.google.com/app/apikey)
2. A [Vercel](https://vercel.com/) account for deployment
3. [Node.js](https://nodejs.org/) and npm installed locally for development

## Local Development Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/selfie-compliment-app.git
   cd selfie-compliment-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Deployment to Vercel

### Option 1: Using GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Login to Vercel and import your GitHub repository
3. During setup:
   - Framework preset: Select "Other"
   - Root directory: Keep as is
   - Build command: Leave blank
   - Output directory: Leave blank
4. Add your environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
5. Deploy

### Option 2: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

4. Set up your environment variables in the Vercel dashboard

## Security Notes

- The API key is stored as an environment variable and used server-side in the `/api/analyze-selfie.js` endpoint
- User images are processed client-side for downscaling before being sent to the API
- Users must consent to image processing before using the app
- No images or data are permanently stored

## Project Structure

- `index.html` - Main application file with HTML, CSS, and client-side JavaScript
- `api/analyze-selfie.js` - Serverless function to proxy requests to Gemini API
- `manifest.json` - PWA manifest for installable app functionality
- `sw.js` - Service Worker for offline capabilities
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project dependencies and scripts

## Creating an Android App (Optional)

You can package this web app as an Android application using Apache Cordova:

1. Install Cordova globally:
   ```bash
   npm install -g cordova
   ```

2. Create a new Cordova project:
   ```bash
   cordova create selfie-app com.example.selfieapp SelfieApp
   ```

3. Navigate to the project:
   ```bash
   cd selfie-app
   ```

4. Add Android platform:
   ```bash
   cordova platform add android
   ```

5. Add camera plugin:
   ```bash
   cordova plugin add cordova-plugin-camera
   ```

6. Copy your web app files to the `www` directory
7. Update the camera access code to use the Cordova Camera plugin
8. Build the Android app:
   ```bash
   cordova build android
   ```

9. The APK will be available in `platforms/android/app/build/outputs/apk/debug/`

## Limitations

- Gemini API free tier has usage limits (60 QPM, 1,500 requests/day)
- Some regions may have restricted access to Gemini API
- Mobile browser camera support varies across devices

## Alternative Hosting Options

Besides Vercel, you can deploy this app on:

1. **Netlify**:
   - Similar to Vercel with GitHub integration
   - Create a `netlify.toml` file for configuration
   - Use Netlify Functions instead of Vercel serverless functions

2. **GitHub Pages + Firebase Functions**:
   - Host static files on GitHub Pages
   - Use Firebase Functions for the API endpoint

3. **AWS Amplify**:
   - Provides GitHub integration and CI/CD
   - Use AWS Lambda functions for the backend

## License

MIT