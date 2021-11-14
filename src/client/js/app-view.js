import { isValidURL, handleError } from './utils';
import { analyse } from './app-controller';

let $form;
let $results;

const storeElements = () => {
  $form = {
    analyse: document.forms.analyser,
    url: document.forms.analyser.url,
    submitButton: document.forms.analyser.submit,
  };

  $results = {
    loader: document.querySelector('.loader'),
    block: document.querySelector('.data.block'),
    polarity: document.querySelector('.polarity .data-value'),
    confidence: document.querySelector('.confidence .data-value'),
    agreement: document.querySelector('.agreement .data-value'),
    subjectivity: document.querySelector('.subjectivity .data-value'),
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

const onAnalyserFormSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const url = $form.url.value;
  if (!isValidURL(url)) {
    return alert(`wong url ${url}`);
  }
  toggleLoader();
  toggleSubmitButton();
  toggleResultsBlock('hide');
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

window.addEventListener('DOMContentLoaded', init);
