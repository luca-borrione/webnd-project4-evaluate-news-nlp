import { handleErrorAndReject } from './error-utils.js';

export const postData = (url, data) =>
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch(handleErrorAndReject);
