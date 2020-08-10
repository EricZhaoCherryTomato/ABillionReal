/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
jest.mock('react-native-tts', () => {
  return {
    speak: jest.fn(),
  };
});
it('renders correctly', () => {
  fetch = jest.fn(() => Promise.resolve());
  console.log(renderer.create(<App />).toJSON());
});
