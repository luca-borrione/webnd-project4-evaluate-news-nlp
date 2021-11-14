import { isValidURL, postData, handleErrorAndReject } from './utils';

const analyse = (url) => postData('/api/analyse', { url }).catch(handleErrorAndReject);

export const handleSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  // check what text was put into the form field
  const url = document.getElementById('url').value;
  if (!isValidURL(url)) {
    return alert(`wong url ${url}`);
  }

  // console.log('::: Form Submitted :::');
  // fetch('http://localhost:8080/test')
  //   .then((res) => res.json())
  //   .then((res) => {
  //     document.getElementById('results').innerHTML = res.message;
  //   });
  return analyse(url).then((data) => console.log('>> data', data));
};
