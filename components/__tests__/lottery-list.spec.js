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
  it('should renders the correct text', async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            response: 'OK',
            DrawResults: [
              {
                ProductId: 'MonWedLotto',
                DrawNumber: 3997,
                DrawDate: '2020-08-05T00:00:00',
                DrawDisplayName: 'Mon & Wed Lotto Draw 3997',
                DrawLogoUrl:
                  'http://media.tatts.com/TattsServices/Lotto/Products/MonWedTattsLotto_v1.png',
                PrimaryNumbers: [40, 18, 11, 14, 10, 39],
                SecondaryNumbers: [34, 23],
                TicketNumbers: null,
                Dividends: [
                  {
                    Division: 1,
                    BlocNumberOfWinners: 2,
                    BlocDividend: 1000000.0,
                    CompanyId: 'Tattersalls',
                    CompanyNumberOfWinners: 1,
                    CompanyDividend: 1000000.0,
                    PoolTransferType: 'NONE',
                    PoolTransferredTo: 0,
                  },
                ],
              },
            ],
          }),
      }),
    );

    const lotteryListComponent = await renderer.create(<LotteryList />);
    const testInstance = lotteryListComponent.toJSON();
    expect(testInstance.type).toBe('View');
  });
});
