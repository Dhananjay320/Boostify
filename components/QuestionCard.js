import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionCard = ({ questionData, selectedOption, onSelectOption, timer }) => {
  if (!questionData) return null;

  return (
    <View>
      <Text style={styles.timer}>Time Left: {timer}s</Text>
      <Text style={styles.question}>{questionData.question}</Text>
      {questionData.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => onSelectOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#d1e7dd',
  },
  optionText: {
    fontSize: 16,
  },
});

export default QuestionCard;
