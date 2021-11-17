import { analyse } from './app-controller';
import './app-view';
import { selectors } from './utils';

jest.mock('./app-controller', () => ({
  analyse: jest.fn().mockResolvedValue({
    polarity: 'mock-polarity',
    confidence: 'mock-confidence',
    agreement: 'mock-agreement',
    subjectivity: 'mock-subjectivity',
  }),
}));

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('app-view', () => {
  let $form;
  let $results;

  const storeElements = () => {
    $form = {
      analyser: document.forms.analyser,
      url: document.forms.analyser.elements['form-analyser__url-field'],
      submitButton: document.forms.analyser.elements['form-analyser__submit-button'],
      error: document.querySelector(selectors.form.error),
      spinner: document.querySelector(selectors.form.spinner),
    };

    $results = {
      card: document.querySelector(selectors.results.card),
      polarity: document.querySelector(selectors.results.polarity),
      confidence: document.querySelector(selectors.results.confidence),
      agreement: document.querySelector(selectors.results.agreement),
      subjectivity: document.querySelector(selectors.results.subjectivity),
    };
  };

  beforeEach(() => {
    window.document.body.innerHTML = `
      <span class="form-analyser__error-message"></span>
      <form name="analyser">
        <input type="text" id="form-analyser__url-field" />
        <button type="submit" id="form-analyser__submit-button"></button>
      </form>
      <div class="form-analyser__spinner hide"></div>
      <div class="results-card hide">
        <span class="results-card__polarity-value"></span>
        <span class="results-card__confidence-value"></span>
        <span class="results-card__agreement-value"></span>
        <span class="results-card__subjectivity-value"></span>
      </div>
    `;

    window.document.dispatchEvent(
      new Event('DOMContentLoaded', {
        bubbles: true,
        cancelable: true,
      })
    );

    storeElements();
  });

  describe('submitting a new url', () => {
    it('should prompt an error message if the url is in the wrong format', async () => {
      expect($form.error.innerHTML).toBe('');
      $form.url.value = 'wrong-format';
      $form.analyser.submit();
      expect($form.error.innerHTML).toBe('<h3>the url you entered is in a wrong format</h3>');
    });

    it('should show the spinner', () => {
      expect($form.spinner.classList.contains('hide')).toBe(true);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($form.spinner.classList.contains('hide')).toBe(false);
    });

    it('should hide the submit button', () => {
      expect($form.submitButton.classList.contains('hide')).toBe(false);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($form.submitButton.classList.contains('hide')).toBe(true);
    });

    it('should keep hidden the results card', () => {
      expect($results.card.classList.contains('hide')).toBe(true);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($results.card.classList.contains('hide')).toBe(true);
    });

    it('should keep empty the error message', () => {
      expect($form.error.innerHTML).toBe('');
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($form.error.innerHTML).toBe('');
    });

    it('should trigger an analysis of the url', () => {
      expect(analyse).not.toHaveBeenCalled();
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect(analyse).toHaveBeenCalledTimes(1);
      expect(analyse).toHaveBeenCalledWith('http://www.example.com');
    });
  });

  describe('receiving the data of the analysis', () => {
    it('should update the results', async () => {
      expect($results.polarity.innerHTML).toBe('');
      expect($results.confidence.innerHTML).toBe('');
      expect($results.agreement.innerHTML).toBe('');
      expect($results.subjectivity.innerHTML).toBe('');
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      await flushPromises();
      expect($results.polarity.innerHTML).toBe('mock-polarity');
      expect($results.confidence.innerHTML).toBe('mock-confidence');
      expect($results.agreement.innerHTML).toBe('mock-agreement');
      expect($results.subjectivity.innerHTML).toBe('mock-subjectivity');
    });

    it('should hide again the spinner', async () => {
      expect($form.spinner.classList.contains('hide')).toBe(true);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($form.spinner.classList.contains('hide')).toBe(false);
      await flushPromises();
      expect($form.spinner.classList.contains('hide')).toBe(true);
    });

    it('should show the results card', async () => {
      expect($results.card.classList.contains('hide')).toBe(true);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($results.card.classList.contains('hide')).toBe(true);
      await flushPromises();
      expect($results.card.classList.contains('hide')).toBe(false);
    });

    it('should show again the submit button', async () => {
      expect($form.submitButton.classList.contains('hide')).toBe(false);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($form.submitButton.classList.contains('hide')).toBe(true);
      await flushPromises();
      expect($form.submitButton.classList.contains('hide')).toBe(false);
    });

    it('should handle an error nicely', async () => {
      const expectedError = new Error('mock-expected-error');
      analyse.mockRejectedValueOnce(expectedError);
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      await flushPromises();
      expect(errorSpy).toBeCalledTimes(1);
      expect(errorSpy).toBeCalledWith(expectedError);
    });
  });

  describe('resubmitting a new url', () => {
    it('should hide again the results card', async () => {
      expect($results.card.classList.contains('hide')).toBe(true);
      $form.url.value = 'http://www.example.com';
      $form.analyser.submit();
      expect($results.card.classList.contains('hide')).toBe(true);
      await flushPromises();
      expect($results.card.classList.contains('hide')).toBe(false);
      $form.url.value = 'http://www.example.co.uk';
      $form.analyser.submit();
      expect($results.card.classList.contains('hide')).toBe(true);
    });
  });
});
