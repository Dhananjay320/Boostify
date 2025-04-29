import axios from 'axios';
import OPENAI_API_KEY from './openai';

export const fetchPerformanceTips = async (score) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Give performance tips for a student who scored ${score} marks out of 80 in a skill test. Also motivate him to improve.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching performance tips:', error);
    return 'Could not fetch tips. Please try again.';
  }
};
