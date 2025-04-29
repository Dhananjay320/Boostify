import axios from 'axios';
import OPENAI_API_KEY from './openai';

export const fetchQuestions = async (topic) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate 20 MCQ questions on ${topic}. Each question must have 4 options (A, B, C, D) and provide correct answer separately.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const text = response.data.choices[0].message.content;
    return text;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return null;
  }
};
