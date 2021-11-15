import { postData, handleErrorAndReject } from './utils';
import { analyse } from './app-controller';

jest.mock('./utils', () => ({
  handleErrorAndReject: jest.fn(),
  postData: jest.fn().mockResolvedValue({
    success: true,
    results: {
      agreement: 'mock-agreement',
      confidence: 'mock-confidence',
      score_tag: 'P+',
      subjectivity: 'mock-subjectivity',
    },
  }),
}));

describe('appt-controller', () => {
  describe('analyse', () => {
    it('should correctly call postData', async () => {
      await analyse('mock-url');
      expect(postData).toHaveBeenCalledTimes(1);
      expect(postData).toHaveBeenCalledWith('/api/analyse', { url: 'mock-url' });
    });

    it('should resolve returning the data received from postData transformed as needed', async () => {
      const response = await analyse('mock-url');
      expect(response).toStrictEqual({
        agreement: 'mock-agreement',
        confidence: 'mock-confidence',
        polarity: 'strong positive',
        subjectivity: 'mock-subjectivity',
      });
    });

    it('should handle an error nicely', async () => {
      const expectedError = new Error('mock-expected-error');
      postData.mockRejectedValueOnce(expectedError);
      await analyse('mock-url');
      expect(handleErrorAndReject).toBeCalledTimes(1);
      expect(handleErrorAndReject).toBeCalledWith(expectedError);
    });

    it('should reject returning the error message when postData is not successfull', async () => {
      postData.mockResolvedValueOnce({ success: false, message: 'something went wrong' });
      const expectedError = new Error('something went wrong');
      await analyse('mock-url');
      expect(handleErrorAndReject).toBeCalledTimes(1);
      expect(handleErrorAndReject).toBeCalledWith(expectedError);
    });
  });
});
