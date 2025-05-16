import axios from 'axios';
import { LinkedInMetrics } from './powerBiService';

export interface AIInsightRequest {
  metrics: LinkedInMetrics;
  insightCount?: number;
}

export interface AIGeneratedInsight {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
  confidence: number;
}

export async function generateLinkedInInsights(
  request: AIInsightRequest
): Promise<AIGeneratedInsight[]> {
  try {
    console.log("aiService: Generating LinkedIn insights");
    // For a real implementation, you would call an AI API like OpenAI
    // const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    //   model: 'gpt-4',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are an AI analytics expert. Analyze the LinkedIn metrics and provide insights.'
    //     },
    //     {
    //       role: 'user',
    //       content: JSON.stringify(request.metrics)
    //     }
    //   ]
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Parse LinkedIn metrics to generate insights
    const insights: AIGeneratedInsight[] = [];
    const { metrics } = request;
    
    // Generate insights based on follower growth
    if (metrics.followers.growth > 5) {
      insights.push({
        title: `LinkedIn follower growth up ${metrics.followers.growth.toFixed(1)}%`,
        description: `Your follower count has increased from ${metrics.followers.previous} to ${metrics.followers.current} this month. Your content strategy is performing well.`,
        type: 'success',
        confidence: 0.92
      });
    } else if (metrics.followers.growth < 0) {
      insights.push({
        title: `LinkedIn follower growth declining`,
        description: `Your follower count has decreased by ${Math.abs(metrics.followers.growth).toFixed(1)}% this month. Consider reviewing your content strategy.`,
        type: 'warning',
        confidence: 0.89
      });
    }
    
    // Generate insights based on engagement
    if (metrics.engagement.rate > metrics.engagement.industryAverage) {
      const percentDiff = ((metrics.engagement.rate - metrics.engagement.industryAverage) / metrics.engagement.industryAverage * 100).toFixed(0);
      insights.push({
        title: `Engagement rate exceeding industry average`,
        description: `Your engagement rate of ${metrics.engagement.rate.toFixed(1)}% is ${percentDiff}% higher than the industry average. Continue with your current content approach.`,
        type: 'success',
        confidence: 0.94
      });
    }
    
    // Generate insights based on post performance by day
    if (metrics.posts.dayAnalysis.engagementDiff > 20) {
      insights.push({
        title: `Optimal posting day identified`,
        description: `Posts published on ${metrics.posts.dayAnalysis.bestDay}s receive ${metrics.posts.dayAnalysis.engagementDiff}% more engagement than other days. Consider scheduling more content on this day.`,
        type: 'info',
        confidence: 0.87
      });
    }
    
    // Generate insights based on content type
    const topPost = metrics.posts.topPerforming[0];
    if (topPost && topPost.engagement > 5) {
      insights.push({
        title: `${topPost.type.charAt(0).toUpperCase() + topPost.type.slice(1)} content performing well`,
        description: `Your ${topPost.type} posts are generating the highest engagement at ${topPost.engagement.toFixed(1)}%. Consider creating more content in this format.`,
        type: 'info',
        confidence: 0.85
      });
    }
    
    // Limit the number of insights based on request
    const insightCount = request.insightCount || 3;
    return insights.slice(0, insightCount);
    
  } catch (error) {
    console.error('Error generating AI insights:', error);
    throw error;
  }
}

export async function generateLinkedInContent(
  prompt: string, 
  contentType: string, 
  tone: string, 
  wordCount: number
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  let contextPrompt = `You are a professional content creator specializing in LinkedIn posts for the power analytics industry at Enspec Power. `;
  contextPrompt += `Create a ${tone} ${contentType.replace('_', ' ')} LinkedIn post `;
  
  if (prompt) {
    contextPrompt += `about: ${prompt} `;
  } else {
    contextPrompt += `about Enspec Power's analytics solutions for the energy sector `;
  }
  
  contextPrompt += `that is approximately ${wordCount} words long. Include 2-3 relevant hashtags at the end. `;
  contextPrompt += `Focus on being authentic, insightful, and valuable to the reader. `;
  contextPrompt += `The tone should be ${tone} and suitable for a professional B2B audience in the energy sector.`;

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

  return response.data.choices[0].message.content;
} 