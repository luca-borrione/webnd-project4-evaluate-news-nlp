import { isValidURL } from './url-validator';

describe('isValidURL', () => {
  it.each([
    'http://foo.com/blah_blah',
    'http://foo.com/blah_blah/',
    'http://www.example.com/wpstyle/?p=364',
    'https://www.example.com/foo/?bar=baz&inga=42&quux',
    'http://142.42.1.1/',
    'http://142.42.1.1:8080/',
    'http://foo.bar/?q=Test%20URL-encoded%20stuff',
    'https://223.255.255.254',
    'foo.com',
    'www.foo.com',
  ])('should pass for valid url %s', (url) => {
    expect(isValidURL(url)).toBe(true);
  });

  it.each([
    'http://-error-.invalid/',
    'http://-a.b.co',
    'http://a.b-.co',
    'http://.www.foo.bar/',
    'https://www.foo.bar1/',
    'http://www.foo.bar./',
    'http://.www.foo.bar./',
  ])('should fail for invalid url %s', (url) => {
    expect(isValidURL(url)).toBe(false);
  });
});
