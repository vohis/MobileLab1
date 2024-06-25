import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Switch, TouchableNativeFeedback, Platform, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoItem from '@/components/ToDoItem';

interface Task {
  key: string;
  value: string;
  completed: boolean;
}

const HomeScreen: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks', error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks', error);
      }
    })();
  }, [tasks]);

  const addTask = useCallback(() => {
    if (task.trim().length > 0) {
      setTasks(prevTasks => [...prevTasks, { key: Math.random().toString(), value: task, completed: false }]);
      setTask('');
    }
  }, [task]);

  const markTaskCompleted = useCallback((taskKey: string) => {
    setTasks(prevTasks =>
      prevTasks.map(t => (t.key === taskKey ? { ...t, completed: true } : t))
    );
  }, []);

  const deleteTask = useCallback((taskKey: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.key !== taskKey));
  }, []);

  const deleteAllTasks = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setTasks([]);
      animatedValue.setValue(1);
    });
  }, [animatedValue]);

  const toggleTheme = useCallback(() => {
    setDarkTheme(prevDarkTheme => !prevDarkTheme);
  }, []);

  const handleAddTask = useCallback(() => {
    if (task.trim().length > 0) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValue, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start(addTask);
    }
  }, [animatedValue, addTask, task]);

  const addButtonStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <Text style={[styles.title, darkTheme && styles.darkTitle]}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Task"
          style={[styles.input, darkTheme && styles.darkInput]}
          value={task}
          onChangeText={setTask}
          placeholderTextColor={darkTheme ? '#fff' : '#000'}
        />
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback onPress={handleAddTask}>
            <Animated.View style={[styles.addButton, addButtonStyle]}>
              <Text style={styles.addButtonText}>ADD</Text>
            </Animated.View>
          </TouchableNativeFeedback>
        ) : (
          <Button title="ADD" onPress={addTask} />
        )}
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <ToDoItem
            title={item.value}
            completed={item.completed}
            onMarkCompleted={() => markTaskCompleted(item.key)}
            onDelete={() => deleteTask(item.key)}
            darkTheme={darkTheme}
          />
        )}
        keyExtractor={item => item.key}
      />
      <Animated.View style={{ opacity: animatedValue }}>
        <Button
          title="Delete All Tasks"
          onPress={deleteAllTasks}
          color={darkTheme ? '#f00' : '#ff0000'}
          disabled={tasks.length === 0}
        />
      </Animated.View>
      <View style={styles.themeSwitch}>
        <Text style={[styles.themeText, darkTheme && styles.darkThemeText]}>Dark Theme</Text>
        <Switch value={darkTheme} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: '#444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkTitle: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: '80%',
    color: '#000',
  },
  darkInput: {
    color: '#fff',
    borderBottomColor: '#ccc',
  },
  themeSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  themeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkThemeText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
  },
});

export default HomeScreen;
