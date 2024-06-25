import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Определяем типы пропсов
interface ToDoItemProps {
  title: string;
  completed: boolean;
  onMarkCompleted: () => void; // Функция для отметки задачи как выполненной
  onDelete: () => void; // Функция для удаления задачи
}

// Компонент для отображения отдельного элемента списка задач
const ToDoItem: React.FC<ToDoItemProps> = ({ title, completed, onMarkCompleted, onDelete }) => {
  return (
    <TouchableOpacity onPress={onMarkCompleted}>
      <View style={styles.listItem}>
        <Text style={{ textDecorationLine: completed ? 'line-through' : 'none' }}>{title}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Стили для компонента ToDoItem
const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
});

export default ToDoItem;
