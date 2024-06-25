// __tests__/ToDoItem.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ToDoItem from '@/components/ToDoItem';

test('renders correctly and interacts with buttons', () => {
  const onMarkCompleted = jest.fn();
  const onDelete = jest.fn();

  const { getByText } = render(
    <ToDoItem
      title="Test Task"
      completed={false}
      onMarkCompleted={onMarkCompleted}
      onDelete={onDelete}
      darkTheme={false}
    />
  );

  fireEvent.press(getByText('Test Task'));
  fireEvent.press(getByText('Delete'));

  expect(onMarkCompleted).toHaveBeenCalled();
  expect(onDelete).toHaveBeenCalled();
});
