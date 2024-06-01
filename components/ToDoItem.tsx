import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Определяем типы пропсов
interface ToDoItemProps {
  title: string;
}

// Компонент для отображения отдельного элемента списка задач
const ToDoItem: React.FC<ToDoItemProps> = ({ title }) => {
  return (
    <View style={styles.listItem}>
      <Text>{title}</Text>
    </View>
  );
};

// Стили для компонента ToDoItem
const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ToDoItem;