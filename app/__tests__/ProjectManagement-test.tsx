import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProjectManagement from '../../app/project'; 
import { Alert } from 'react-native';

// Mock Alert.alert to verify it's being called
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Reset mock before each test to avoid conflicts
beforeEach(() => {
  jest.clearAllMocks();
});

describe('ProjectManagement Component', () => {
  test('adds a project when fields are filled and button is pressed', () => {
    const { getByPlaceholderText, getByText } = render(<ProjectManagement />);

    // Fill out fields
    fireEvent.changeText(getByPlaceholderText('Enter project name'), 'Test Project');
    fireEvent.changeText(getByPlaceholderText('Enter project description'), 'Test Description');
    fireEvent.changeText(getByPlaceholderText('Enter project date'), '2024-11-24');

    // Press add button
    fireEvent.press(getByText('Add Project'));

    // Assert the project is added
    expect(getByText('Name: Test Project')).toBeTruthy();
    expect(getByText('Description: Test Description')).toBeTruthy();
    expect(getByText('Date: 2024-11-24')).toBeTruthy();
  });

  test('shows error when fields are empty', () => {
    const { getByText } = render(<ProjectManagement />);

    // Press add button without filling fields
    fireEvent.press(getByText('Add Project'));

    // Verify Alert.alert is called with correct arguments
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'All fields must be filled!');
  });
});

