import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoItem from '@/components/ToDoItem';

interface Task {
  key: string;
  value: string;
  completed: boolean;
}

const HomeScreen = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  // Загрузка задач из локального хранилища при монтировании компонента
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks', error);
      }
    };
    loadTasks();
  }, []);

  // Сохранение задач в локальное хранилище при изменении списка задач
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false }]);
      setTask('');
    }
  };

  const markTaskCompleted = (taskKey: string) => {
    const updatedTasks = tasks.map(t => {
      if (t.key === taskKey) {
        return { ...t, completed: true };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskKey: string) => {
    const updatedTasks = tasks.filter(t => t.key !== taskKey);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
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
        <Button title="ADD" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <ToDoItem
            title={item.value}
            completed={item.completed}
            onMarkCompleted={() => markTaskCompleted(item.key)}
            onDelete={() => deleteTask(item.key)}
            darkTheme={darkTheme} // Передаем darkTheme в ToDoItem
          />
        )}
        keyExtractor={item => item.key}
      />
      <Button
        title="Delete All Tasks"
        onPress={deleteAllTasks}
        color={darkTheme ? '#f00' : '#ff0000'} // Изменяем цвет кнопки в зависимости от темы
      />
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
});

export default HomeScreen;
