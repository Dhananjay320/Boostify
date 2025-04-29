import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const TimerComponent = ({ timer, setTimer, onTimeUp }) => {
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      onTimeUp();  // Trigger when time is up
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={{ marginBottom: 20 }}>
    <Text style={{
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20}}>Time Left: {timer}s</Text>
    </View>
  );
};

export default TimerComponent;
