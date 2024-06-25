import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импортируем AsyncStorage из нового пакета
import ToDoItem from '@/components/ToDoItem'; // Исправленный путь для импорта компонента ToDoItem

// Определяем тип для задачи
interface Task {
  key: string;
  value: string;
  completed: boolean; // Добавляем поле для отметки выполнения задачи
}

// Основной компонент приложения
const HomeScreen = () => {
  // Хук useState для управления состоянием задачи и списка задач
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

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

  // Функция для добавления новой задачи в список
  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false }]);
      setTask(''); // Сбрасываем значение текстового поля
    }
  };

  // Функция для отметки задачи как выполненной
  const markTaskCompleted = (taskKey: string) => {
    const updatedTasks = tasks.map(t => {
      if (t.key === taskKey) {
        return { ...t, completed: true };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  // Функция для удаления задачи
  const deleteTask = (taskKey: string) => {
    const updatedTasks = tasks.filter(t => t.key !== taskKey);
    setTasks(updatedTasks);
  };

  // Функция для удаления всех задач
  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Task"
          style={styles.input}
          value={task}
          onChangeText={setTask} // Обновляем состояние при изменении текста
        />
        <Button title="ADD" onPress={addTask} />
      </View>
      <FlatList
        data={tasks} // Данные для FlatList
        renderItem={({ item }) => (
          <ToDoItem
            title={item.value}
            completed={item.completed}
            onMarkCompleted={() => markTaskCompleted(item.key)}
            onDelete={() => deleteTask(item.key)}
          />
        )} // Отображаем каждый элемент списка с помощью компонента ToDoItem
        keyExtractor={item => item.key}
      />
      <Button title="Delete All Tasks" onPress={deleteAllTasks} />
    </View>
  );
};

// Стили для компонентов
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  },
});

export default HomeScreen;
