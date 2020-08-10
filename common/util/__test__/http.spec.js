import sinon from 'sinon';
import {Map} from 'immutable';
import {fetchJSON} from '../http';

describe('Http utils', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('should handle POST method', () => {
    fetch = jest.fn(() => Promise.resolve());
    sinon.stub(global, 'fetch').resolves({
      status: 200,
      headers: Map({execution: 'test'}),
      json: () => Promise.resolve({response: 'OK', success: true}),
    });
    fetchJSON('www.example.com/test', 'POST', {
      body: {requestBody: {}},
    }).then((response) => {
      expect(response.success).toEqual(true);
    });
  });
});
