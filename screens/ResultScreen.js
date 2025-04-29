import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet,ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use React Navigation's hooks


const ResultScreen = () => {
  const navigation = useNavigation(); // Use navigation hook
  const route = useRoute(); // Get route params
  const { score, totalQuestions, correctAnswers, wrongAnswers, unanswered } = route.params; // Destructure params
  const [generalTips, setGeneralTips] = useState([
    {
      id: 1,
      tip: 'Understand, Don’t Memorize: Focus on understanding concepts instead of rote learning. When you understand something, you can apply it anywhere.',
    },
    {
      id: 2,
      tip: 'Practice Active Recall: After studying a topic, close your book and try to recall what you learned. This builds long-term memory.',
    },
    {
      id: 3,
      tip: 'Take Smart Notes: Use bullet points, diagrams, or mind maps. Don’t write everything—write what helps you remember better.',
    },
    {
      id: 4,
      tip: 'Use the Pomodoro Technique: Study for 25 minutes, take a 5-minute break. Repeat. It boosts focus and avoids burnout.',
    },
    {
      id: 5,
      tip: 'Ask “Why?” Often: Whether it’s a formula, a theory, or logic—ask yourself why it works. This builds deep understanding.',
    },
    {
      id: 6,
      tip: 'Practice with MCQs/Quizzes: Regular self-quizzing improves speed, accuracy, and confidence in any subject.',
    },
    {
      id: 7,
      tip: 'Don’t Study in Isolation: Join groups, talk with peers, or explain concepts to someone else. Teaching is a powerful way to learn.',
    },
    {
      id: 8,
      tip: 'Limit Distractions: Turn off notifications or use apps like Forest, Focus Keeper, or Study Bunny while studying.',
    },
    {
      id: 9,
      tip: 'Track Your Progress: Maintain a study log or checklist. It keeps you motivated and focused on goals.',
    },
    {
      id: 10,
      tip: 'Prioritize Sleep & Health: No topic is worth your well-being. Sleep helps consolidate memory and improve retention.',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  }, []);

  // Pie chart data
  const data = [
    {
      name: 'Correct Answers',
      population: (correctAnswers / totalQuestions) * 100,
      color: '#00C49F',
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
    {
      name: 'Wrong Answers',
      population: (wrongAnswers / totalQuestions) * 100,
      color: '#FF8042',
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
    {
      name: 'Not Attempted',
      population: (unanswered / totalQuestions) * 100,
      color: '#FFBB28',
      legendFontColor: '#000000',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Your Score: {score}/80</Text>
      {/* Pie Chart */}
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Text style={styles.tipsTitle}>Tips:</Text>
       <ScrollView style={styles.tipsContainer}>
  {generalTips.map((item) => (
    <View key={item.id} style={{ marginBottom: 15 }}>
      <Text style={styles.tipsText}>{`👉 ${item.tip}`}</Text>
    </View>
  ))}
</ScrollView>
      <View style={styles.buttonGroup}>
        <Button title="Retry" onPress={() => navigation.navigate('Quiz', { topic: route.params.topic })} />
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  tipsContainer: {
    marginVertical: 20,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  tipsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 30,
  },
});

export default ResultScreen;
