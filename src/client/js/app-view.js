import { isValidURL, handleError, selectors } from './utils';
import { analyse } from './app-controller';

let $form;
let $results;

const storeElements = () => {
  $form = {
    analyser: document.forms.analyser,
    url: document.forms.analyser.elements['form-analyser__url-field'],
    submitButton: document.forms.analyser.elements['form-analyser__submit-button'],
    error: document.querySelector(selectors.form.error),
  };

  $results = {
    loader: document.querySelector(selectors.results.loader),
    block: document.querySelector(selectors.results.block),
    polarity: document.querySelector(selectors.results.polarity),
    confidence: document.querySelector(selectors.results.confidence),
    agreement: document.querySelector(selectors.results.agreement),
    subjectivity: document.querySelector(selectors.results.subjectivity),
  };
};

const toggleLoader = () => {
  $results.loader.classList.toggle('hide');
};

const toggleResultsBlock = (force) => {
  if (force) {
    $results.block.classList.add('hide');
  } else {
    $results.block.classList.toggle('hide');
  }
};

const toggleSubmitButton = () => {
  $form.submitButton.classList.toggle('hide');
};

const updateView = (data) => {
  $results.polarity.innerHTML = data.polarity;
  $results.confidence.innerHTML = data.confidence;
  $results.agreement.innerHTML = data.agreement;
  $results.subjectivity.innerHTML = data.subjectivity;
};

const clearError = () => {
  $form.error.innerHTML = '';
};

const displayError = (message) => {
  $form.error.innerHTML = `<h3>${message}</h3>`;
};

const onAnalyserFormSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const url = $form.url.value;
  if (!isValidURL(url)) {
    return displayError('the url you entered is in a wrong format');
  }

  toggleLoader();
  toggleSubmitButton();
  toggleResultsBlock('hide');
  clearError();
  return analyse(url)
    .then((results) => {
      updateView(results);
      toggleLoader();
      toggleResultsBlock();
      toggleSubmitButton();
    })
    .catch(handleError);
};

const initEventListeners = () => {
  $form.analyser.addEventListener('submit', onAnalyserFormSubmit);
};

const init = () => {
  storeElements();
  initEventListeners();
};

window.document.addEventListener('DOMContentLoaded', init);
