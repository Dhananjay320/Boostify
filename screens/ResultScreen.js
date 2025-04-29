import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use React Navigation's hooks
import { fetchPerformanceTips } from '../apis/fetchPerformanceTips';

const ResultScreen = () => {
  const navigation = useNavigation(); // Use navigation hook
  const route = useRoute(); // Get route params
  const { score, totalQuestions, correctAnswers, wrongAnswers, unanswered } = route.params; // Destructure params

  const [tips, setTips] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    const performanceTips = await fetchPerformanceTips(score);
    setTips(performanceTips);
    setLoading(false);
  };

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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Performance Tips:</Text>
          <Text style={styles.tipsText}>{tips}</Text>
        </View>
      )}

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
