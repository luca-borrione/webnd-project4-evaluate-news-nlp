describe('api-routes', () => {
  let routeSpy;
  let routeGetSpy;
  let routePostSpy;

  function prepareRouteSpies(path) {
    const express = require('express'); // eslint-disable-line global-require

    routeGetSpy = jest.fn();
    routePostSpy = jest.fn();
    routeSpy = jest.fn().mockImplementation((routePath) => {
      if (routePath === path) {
        return {
          get: routeGetSpy,
          post: routePostSpy,
        };
      }
      return {
        get: jest.fn(),
        post: jest.fn(),
      };
    });
    jest.spyOn(express, 'Router').mockReturnValueOnce({
      route: routeSpy,
    });
    require('./api-routes'); // eslint-disable-line global-require
  }

  beforeEach(() => {
    jest.resetModules();
  });

  it('should match the routes stored in the snapshot', () => {
    prepareRouteSpies();
    expect(routeSpy.mock.calls).toMatchSnapshot();
  });

  it('should correctly set the route for /analyse', () => {
    const route = '/analyse';
    prepareRouteSpies(route);
    const routeIndex = routeSpy.mock.calls.findIndex((mockCall) => mockCall[0] === route);
    expect(routeIndex).toBeGreaterThanOrEqual(0);
    const callback = routePostSpy.mock.calls[0][0];
    expect(callback.name).toBe('postAnalyse');
  });

  it('should correctly set the route for /test', () => {
    const route = '/test';
    prepareRouteSpies(route);
    const routeIndex = routeSpy.mock.calls.findIndex((mockCall) => mockCall[0] === route);
    expect(routeIndex).toBeGreaterThanOrEqual(0);
    const callback = routeGetSpy.mock.calls[0][0];
    expect(callback.name).toBe('getTest');
  });
});
