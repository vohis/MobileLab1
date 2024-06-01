import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import ToDoItem from '../../components/ToDoItem'; // Импортируем компонент ToDoItem

// Определяем тип для задачи
interface Task {
  key: string;
  value: string;
}

// Основной компонент приложения
export default function Home() {
  // Хук useState для управления состоянием задачи и списка задач
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Функция для добавления новой задачи в список
  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { key: Math.random().toString(), value: task }]);
      setTask(''); // Сбрасываем значение текстового поля
    }
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
        renderItem={({ item }) => <ToDoItem title={item.value} />} // Отображаем каждый элемент списка с помощью компонента ToDoItem
      />
    </View>
  );
}

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
