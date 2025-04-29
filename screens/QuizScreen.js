import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, AppState, Text } from 'react-native';
import { fetchQuestions } from '../apis/fetchQuestions';
import QuestionCard from '../components/QuestionCard';
import { useNavigation, useRoute } from '@react-navigation/native'; // Updated to use navigation hooks

const QuizScreen = () => {
  const navigation = useNavigation();  
  const route = useRoute(); // Get route params
  const courseName = route.params?.topic; // Get the topic from route params

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unanswered, setUnanswered] = useState(0); // Track unanswered questions

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    loadQuestions();
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const loadQuestions = async () => {
    const text = await fetchQuestions(courseName);
    if (text) {
      const parsed = parseQuestions(text);
      setQuestions(parsed);
    }
    setLoading(false);
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [timer]);

  const parseQuestions = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const questionsArray = [];
    let currentQuestion = { question: '', options: [], answer: '' };

    lines.forEach(line => {
      if (line.match(/^\d+\./)) {
        if (currentQuestion.question) {
          questionsArray.push(currentQuestion);
          currentQuestion = { question: '', options: [], answer: '' };
        }
        currentQuestion.question = line.replace(/^\d+\.\s*/, '');
      } else if (line.match(/^[A-D]\)/)) {
        currentQuestion.options.push(line.trim());
      } else if (line.toLowerCase().startsWith('answer')) {
        currentQuestion.answer = line.split(':')[1]?.trim();
      }
    });

    if (currentQuestion.question) {
      questionsArray.push(currentQuestion);
    }

    return questionsArray;
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const correctOption = questions[currentIndex].answer;

    if (option.includes(correctOption)) {
      setScore(score + 4);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setScore(score - 1);
      setWrongAnswers(wrongAnswers + 1);
    }
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleNext = () => {
    // Check if no option was selected, then increase unanswered count
    if (selectedOption === null) {
      setUnanswered(unanswered + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setTimer(120);
    } else {
      // Pass necessary data to ResultScreen
      navigation.navigate('Result', {
        score,
        totalQuestions: questions.length,
        correctAnswers,
        wrongAnswers,
        unanswered: questions.length - (correctAnswers + wrongAnswers),
        topic: courseName
      });
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/active/) && nextAppState === 'background') {
      navigation.navigate('Result', {
        score,
        totalQuestions: questions.length,
        correctAnswers,
        wrongAnswers,
        unanswered: questions.length - (correctAnswers + wrongAnswers),
        topic: courseName
      });
    }
    appState.current = nextAppState;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading Questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QuestionCard
        questionData={questions[currentIndex]}
        selectedOption={selectedOption}
        onSelectOption={handleOptionSelect}
        timer={timer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
});

export default QuizScreen;
