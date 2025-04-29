import PythonQuestions from './database/python.json';
import JavaQuestions from './database/java.json';
import WebDevelopmentQuestions from './database/web.json';
import DataScienceQuestions from './database/DataScience.json';
import AIQuestions from './database/ai.json';
import MLQuestions from './database/ml.json';
import BlockchainQuestions from './database/Blockchain.json';
import GeneralizedQuestions from './database/generalised.json';
import AptitudeQuestions from './database/Aptitude.json';
import GKQuestions from './database/gk.json';

// Function to flatten the array of arrays and get 20 random questions
const flattenQuestions = (questions) => {
  // Flatten the array of arrays
  return questions.reduce((acc, curr) => acc.concat(curr), []);
};

// Function to get questions based on course and type (technical/non-technical)
export const getQuestions = (course) => {
  let selectedQuestions = [];

  if (course === 'non-technical') {
    // Mix of aptitude and general knowledge questions for non-technical
    selectedQuestions = [...AptitudeQuestions, ...GKQuestions];
  } else {
    // For technical questions
    if (course === 'python') {
      selectedQuestions = flattenQuestions(PythonQuestions);
    } else if (course === 'java') {
      selectedQuestions = flattenQuestions(JavaQuestions);
    } else if (course === 'web') {
      selectedQuestions = flattenQuestions(WebDevelopmentQuestions);
    } else if (course === 'datascience') {
      selectedQuestions = flattenQuestions(DataScienceQuestions);
    } else if (course === 'ai') {
      selectedQuestions = flattenQuestions(AIQuestions);
    } else if (course === 'ml') {
      selectedQuestions = flattenQuestions(MLQuestions);
    } else if (course === 'blockchain') {
      selectedQuestions = flattenQuestions(BlockchainQuestions);
    } else if (course === 'aptitude') {
      selectedQuestions = flattenQuestions(AptitudeQuestions);
    }
    else {
      // Generalized (all technical questions) if no specific course selected
      selectedQuestions = flattenQuestions(GeneralizedQuestions);
    }
  }

  // Shuffle and select 20 random questions from the selected pool
  const shuffled = selectedQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 20);
};
