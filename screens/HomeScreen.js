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
  const [searchText, setSearchText] = useState('');

  const courses = [
    { name: 'Python Programming', image: require('../assets/python.png') },
    { name: 'Java Programming', image: require('../assets/java.png') },
    { name: 'Web Development', image: require('../assets/web.png') },
    { name: 'Data Science', image: require('../assets/data.png') },
    { name: 'Artificial Intelligence', image: require('../assets/robot.png') },
    { name: 'Machine Learning', image: require('../assets/ml.png') },
    { name: 'Aptitude Skills', image: require('../assets/default.png') },
    {
      name: 'Blockchain Technology',
      image: require('../assets/blockchain.png'),
    },
  ];
  const handleCourseSelect = (courseName) => {
    navigation.navigate('Quiz', { topic: courseName });
  };

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigation.navigate('Quiz', { topic: searchText.trim() });
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

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Start with Search</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Or choose a course:</Text>

      <ScrollView contentContainerStyle={styles.courseList}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.courseButton}
            onPress={() => handleCourseSelect(course.name)}>
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
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
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
