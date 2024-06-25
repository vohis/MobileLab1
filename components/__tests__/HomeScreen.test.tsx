// __tests__/HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

test('adds and deletes tasks correctly', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen />);

  fireEvent.changeText(getByPlaceholderText('Enter Task'), 'Test Task');
  fireEvent.press(getByText('ADD'));

  await waitFor(() => {
    expect(getByText('Test Task')).toBeTruthy();
  });

  fireEvent.press(getByText('Delete'));

  await waitFor(() => {
    expect(queryByText('Test Task')).toBeNull();
  });
});
