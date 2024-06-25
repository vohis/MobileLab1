import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Обновляем типы пропсов для добавления darkTheme
interface ToDoItemProps {
  title: string;
  completed: boolean;
  onMarkCompleted: () => void;
  onDelete: () => void;
  darkTheme: boolean; // Добавляем darkTheme в интерфейс пропсов
}

// Компонент для отображения отдельного элемента списка задач
const ToDoItem: React.FC<ToDoItemProps> = ({ title, completed, onMarkCompleted, onDelete, darkTheme }) => {
  return (
    <TouchableOpacity onPress={onMarkCompleted}>
      <View style={[styles.listItem, darkTheme && styles.darkListItem]}>
        <Text style={{ textDecorationLine: completed ? 'line-through' : 'none', color: darkTheme ? '#fff' : '#000' }}>
          {title}
        </Text>
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
  darkListItem: {
    backgroundColor: '#333',
    borderColor: '#666',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
});

export default ToDoItem;
