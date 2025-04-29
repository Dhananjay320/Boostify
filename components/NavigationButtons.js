import React from 'react';
import { View, Button } from 'react-native';

const NavigationButtons = ({ onNext, isNextDisabled }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
    <Button 
      title="Next" 
      onPress={onNext} 
      disabled={isNextDisabled} // Disable button if time is out
    />
  </View>
);

export default NavigationButtons;
