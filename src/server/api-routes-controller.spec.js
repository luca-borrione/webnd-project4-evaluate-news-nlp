jest.mock('node-fetch');

describe('api-routes-controller', () => {
  let controller;

  beforeEach(() => {
    process.env.API_KEY = 'MOCK-APP-KEY';
    jest.resetModules();
    controller = require('./api-routes-controller'); // eslint-disable-line global-require
  });

  describe('getTest', () => {
    it('should retrieve an empty array if NO entries have been posted', () => {
      const mockRequest = {};
      const mockResponse = { send: jest.fn() };
      controller.getTest(mockRequest, mockResponse);
      expect(mockResponse.send).toHaveBeenCalledTimes(1);
      expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
        message: 'it works!',
        title: 'test json response',
      });
    });
  });

  describe('postAnalyse', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let mockFetch;

    beforeEach(() => {
      mockFetch = require('node-fetch'); // eslint-disable-line global-require
      mockRequest = {
        body: { url: 'mock-url' },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();
    });

    const requiredParams = {
      key: 'MOCK-APP-KEY',
      lang: 'en',
      url: 'mock-url',
    };

    it('should call fetch with the expected protocol hostname and pathname', async () => {
      await controller.postAnalyse(mockRequest, mockResponse, mockNext);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const parsedUrl = new URL(mockFetch.mock.calls[0][0]);
      expect(parsedUrl.protocol).toBe('https:');
      expect(parsedUrl.hostname).toBe('api.meaningcloud.com');
      expect(parsedUrl.pathname).toBe('/sentiment-2.1');
    });

    it('should call fetch sending the required params in the query', async () => {
      await controller.postAnalyse(mockRequest, mockResponse, mockNext);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const parsedUrl = new URL(mockFetch.mock.calls[0][0]);
      const queryParams = Object.fromEntries(new URLSearchParams(parsedUrl.search));
      expect(queryParams).toStrictEqual(requiredParams);
    });

    it('should call fetch sending undefined key if not set in the env', async () => {
      delete process.env.API_KEY;
      jest.mock('dotenv', () => ({
        config: jest.fn().mockImplementationOnce(() => {}),
      }));
      jest.resetModules();
      controller = require('./api-routes-controller'); // eslint-disable-line global-require
      mockFetch = require('node-fetch'); // eslint-disable-line global-require
      await controller.postAnalyse(mockRequest, mockResponse, mockNext);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const parsedUrl = new URL(mockFetch.mock.calls[0][0]);
      expect(parsedUrl.searchParams.get('key')).toBe('undefined');
    });

    it('should be unsuccessful and send the failure message when the remote api responds with a non-ok status', async () => {
      const MOCK_FETCH_STATUS = 401;
      mockFetch.mockReturnValueOnce({
        status: MOCK_FETCH_STATUS,
        json: jest.fn().mockReturnValueOnce({
          message: 'mock-failure-message',
        }),
      });
      await controller.postAnalyse(mockRequest, mockResponse, mockNext);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(MOCK_FETCH_STATUS);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'mock-failure-message',
        success: false,
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith('mock-failure-message');
    });

    it('should be successful and send the results data when the remote api responds with an ok status', async () => {
      mockFetch.mockReturnValueOnce({
        status: 200,
        json: jest.fn().mockReturnValueOnce({ data: 'mock-results-data' }),
      });
      await controller.postAnalyse(mockRequest, mockResponse, mockNext);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        results: { data: 'mock-results-data' },
        success: true,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should be unsuccessful and send the error message when an error occurs', async () => {
      mockFetch.mockReturnValueOnce({
        status: 200,
        json: jest.fn().mockImplementationOnce(() => {
          throw new Error('mock-error-message');
        }),
      });
      await controller.postAnalyse(mockRequest, mockResponse, mockNext);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'mock-error-message',
        success: false,
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(new Error('mock-error-message'));
    });
  });
});
