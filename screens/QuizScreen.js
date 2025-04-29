import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, AppState,ImageBackground  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getQuestions } from '../apis/api.js';
import QuestionCard from '../components/QuestionCard';
import TimerComponent from '../components/TimerComponent';
import NavigationButtons from '../components/NavigationButtons';

const QuizScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const courseName = route.params?.topic;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unanswered, setUnanswered] = useState(0);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    loadQuestions();
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const loadQuestions = async () => {
    const text = getQuestions(courseName);
    if (text) {
      setQuestions(text);
    }
    setLoading(false);
  };

  const handleOptionSelect = (option) => {
    if (questions[currentIndex].hasAnswered) return; // Prevent multiple answers for same question
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Check if the user has answered the question
    if (!selectedOption) {
      setUnanswered(unanswered + 1);
    } else {
      const correctOption = questions[currentIndex].answer;
      if (selectedOption.includes(correctOption)) {
        setScore(score + 4);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setScore(score - 1);
        setWrongAnswers(wrongAnswers + 1);
      }
    }

    // Mark the question as answered
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].hasAnswered = true;
    setQuestions(updatedQuestions);

    // Move to the next question or go to result screen
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setTimer(120); // Reset timer for next question
    } else {
      navigation.navigate('Result', {
        score,
        totalQuestions: questions.length,
        correctAnswers,
        wrongAnswers,
        unanswered: questions.length - (correctAnswers + wrongAnswers),
        topic: courseName,
      });
    }
  };

  const handleTimeUp = () => {
    handleNext();
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/active/) && nextAppState === 'background') {
      navigation.navigate('Result', {
        score,
        totalQuestions: questions.length,
        correctAnswers,
        wrongAnswers,
        unanswered: questions.length - (correctAnswers + wrongAnswers),
        topic: courseName,
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
    <ImageBackground
    source={require('../assets/default.png')} // Make sure the image is present in your assets folder
    style={{flex: 1}}
    resizeMode="cover"
    imageStyle={{ opacity: 0.5 }} // Optional: makes the image subtle
  >
    <View style={styles.container}>
      {/* Timer Component */}
      <TimerComponent timer={timer} setTimer={setTimer} onTimeUp={handleTimeUp} />

      <QuestionCard
        questionData={questions[currentIndex]}
        selectedOption={selectedOption}
        onSelectOption={handleOptionSelect}
        timer={timer}
      />

      {/* Navigation Button */}
      <NavigationButtons onNext={handleNext} isNextDisabled={timer === 0} />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      },
  container: {
    padding: '7%',
    paddingTop: '40%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default QuizScreen;
