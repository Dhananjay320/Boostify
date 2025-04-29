import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState(''); // technical or non-technical
  const [searchText, setSearchText] = useState('');
  const courses = [
    { name: 'Python Programming',callname : 'python', image: require('../assets/python.png') },
    { name: 'Java Programming',callname : 'java', image: require('../assets/java.png') },
    { name: 'Web Development',callname : 'web', image: require('../assets/web.png') },
    { name: 'Data Science',callname : 'datascience', image: require('../assets/data.png') },
    { name: 'Artificial Intelligence',callname : 'ai', image: require('../assets/robot.png') },
    { name: 'Machine Learning',callname : 'ml', image: require('../assets/ml.png') },
    { name: 'Aptitude Skills',callname : 'aptitude', image: require('../assets/default.png') },
    {
      name: 'Blockchain Technology',
      callname : 'blockchain',
      image: require('../assets/blockchain.png'),
    },
  ];

  const handleCourseSelect = (callname) => {
    navigation.navigate('Quiz', { topic: callname });
  };

  const handleSearch = () => {
    if (type !== '') {
      navigation.navigate('Quiz', { topic: type });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boostify 🚀</Text>
          
      <TextInput
        style={styles.searchInput}
        placeholder="Search your own topic..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.typeButtons}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'technical' && styles.typeButtonActive,
          ]}
          onPress={() => setType('technical')}>
          <Text
            style={[
              styles.typeButtonText,
              type === 'technical' && styles.typeButtonTextActive,
            ]}>
            Technical
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'non-technical' && styles.typeButtonActive,
          ]}
          onPress={() => setType('non-technical')}>
          <Text
            style={[
              styles.typeButtonText,
              type === 'non-technical' && styles.typeButtonTextActive,
            ]}>
            Non-Technical
          </Text>
        </TouchableOpacity>
      </View>

      {type !== '' && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Start with {type}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtitle}>Or choose a course:</Text>

      <ScrollView contentContainerStyle={styles.courseList}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.courseButton}
            onPress={() => handleCourseSelect(course.callname)}>
            <View style={styles.courseCard}>
              <Image source={course.image} style={styles.courseImage} />
              <Text style={styles.courseText}>{course.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchInput: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#3b82f6',
  },
  typeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseList: {
    paddingBottom: 40,
  },
  courseButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  courseText: {
    fontSize: 16,
    color: '#333',
  },
});
