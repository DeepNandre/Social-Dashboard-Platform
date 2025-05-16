import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Enable CORS with specific settings
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Make sure these lines are included for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api', llmService);

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Start server with error handling
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
  } else {
    console.error('Server error:', err);
  }
});

const router = express.Router();

// Add debug logging middleware
router.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Content generator endpoint
router.post('/content-generator', async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return res.status(500).json({
      error: 'Configuration Error',
      message: 'OpenAI API key is not configured'
    });
  }

  try {
    console.log('Request body:', req.body);
    const { prompt, contentType, tone, wordCount } = req.body;
    
    // Allow for missing fields with defaults
    let contextPrompt = `You are a professional content creator specializing in LinkedIn posts for the power analytics industry at Enspec Power. `;
    contextPrompt += `Create a ${tone || 'professional'} ${(contentType || 'industry_insight').replace('_', ' ')} LinkedIn post `;
    contextPrompt += `about: ${prompt || "Enspec Power's analytics solutions"} `;
    contextPrompt += `that is approximately ${wordCount || 300} words long. Include 2-3 relevant hashtags at the end. `;
    contextPrompt += `Focus on being authentic, insightful, and valuable to the reader. `;
    contextPrompt += `The tone should be ${tone || 'professional'} and suitable for a professional B2B audience in the energy sector.`;

    console.log('Sending to OpenAI:', contextPrompt);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional LinkedIn content creator for a power analytics company.'
          },
          {
            role: 'user',
            content: contextPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = response.data.choices[0].message.content.trim();
    console.log('Generated content successfully');
    
    return res.json({ content: generatedText });
  } catch (error) {
    console.error('Error generating content:', error.message);
    return res.status(500).json({
      error: 'Failed to generate content',
      message: error.message
    });
  }
});

export default router;
