const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt, contentType, tone, wordCount } = JSON.parse(event.body);
    
    const contextPrompt = `Create a ${tone || 'professional'} ${(contentType || 'industry_insight').replace('_', ' ')} LinkedIn post about: ${prompt || "power analytics"} that is approximately ${wordCount || 300} words long.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a professional LinkedIn content creator.' },
          { role: 'user', content: contextPrompt }
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

    return {
      statusCode: 200,
      body: JSON.stringify({ content: response.data.choices[0].message.content })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate content',
        message: error.message 
      })
    };
  }
}; 