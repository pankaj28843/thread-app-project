export function fetchAPIData(url) {
  return fetch(url).then(response => response.json());
