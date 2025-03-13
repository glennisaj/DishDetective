import OpenAI from 'openai';
import { env } from '@/env.mjs';
import { type Review } from '@/types/restaurant';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface DishMention {
  name: string;
  count: number;
  sentiment: number; // -1 to 1
  price?: string;
  comments: string[];
}

interface ReviewAnalysisResult {
  topDishes: {
    name: string;
    description: string;
    sentiment: number;
    price?: string;
    mentionCount: number;
    highlights: string[];
  }[];
  analyzedReviewCount: number;
}

export async function analyzeReviews(reviews: Review[]): Promise<ReviewAnalysisResult> {
  try {
    // Filter to recent reviews (last 60 days)
    const recentReviews = reviews.filter(review => {
      const reviewDate = new Date(review.time);
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
      return reviewDate >= sixtyDaysAgo;
    });

    if (recentReviews.length === 0) {
      return {
        topDishes: [],
        analyzedReviewCount: 0
      };
    }

    // Prepare the reviews for analysis
    const reviewsText = recentReviews
      .map(review => `Rating: ${review.rating}\nReview: ${review.text}`)
      .join('\n\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a restaurant review analyst. Extract and analyze dish mentions from reviews. Respond ONLY with a JSON object containing the analysis results. Do not include any markdown formatting or additional text."
        },
        {
          role: "user",
          content: `Analyze these restaurant reviews and identify the top mentioned dishes:

${reviewsText}

Return ONLY a JSON object with this exact structure:
{
  "topDishes": [
    {
      "name": "dish name",
      "description": "brief description based on reviews",
      "sentiment": 0.0,
      "price": "price if mentioned",
      "mentionCount": 0,
      "highlights": ["notable quotes about this dish"]
    }
  ]
}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    console.log('AI Analysis Result:', analysis);

    return {
      topDishes: analysis.topDishes,
      analyzedReviewCount: recentReviews.length
    };

  } catch (error) {
    console.error('Error analyzing reviews:', error);
    // Return empty results instead of throwing
    return {
      topDishes: [],
      analyzedReviewCount: 0
    };
  }
}
