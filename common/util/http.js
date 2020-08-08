export function fetchJSON(url, method, options) {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body),
  })
    .then((response) => {
      if (response.status === 204) {
        return {};
      }
      return response.json().then((data) => data);
    })
    .catch((error) => {
      console.error('Error:', error); // TODO: handle error
      throw error;
    });
}
