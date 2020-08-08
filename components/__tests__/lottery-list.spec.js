/**
 * @format
 */

import 'react-native';
import React from 'react';
import LotteryList from '../lottery-list';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-tts', () => {
  return {
    speak: jest.fn(),
  };
});
describe('lottery list', () => {
  it('should renders correctly', () => {
    fetch = jest.fn(() => Promise.resolve());

    renderer.create(<LotteryList />);
  });
});
