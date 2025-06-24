import { DOMAIN } from '../config.js';

export default async function auth() {
  const url = `${DOMAIN}/general/auth`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cookie: document.querySelector('#field-webflow-cookie').value,
      xsrfToken: document.querySelector('#field-webflow-xsrf-token').value,
      project: document.querySelector('#field-webflow-project').value,
    }),
  });

  alert(response.status);
}
