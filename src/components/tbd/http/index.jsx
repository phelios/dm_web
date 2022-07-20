function tbdFetch(url, payload, setIsLoading) {
  setIsLoading(true);
  return fetch(url, payload)
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
}

export function tbdGet(url, params, setIsLoading) {
  return tbdFetch(url, {}, setIsLoading)
}

export function tbdPost(url, data, setIsLoading) {
  const payload = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return tbdFetch(url, payload, setIsLoading)
}

export function tbdPut(url, data, setIsLoading) {
  const payload = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return tbdFetch(url, payload, setIsLoading);
}

export function tbdDelete(url, setIsLoading) {
    const payload = {
      method: 'DELETE',
    };

    return tbdFetch(url, payload, setIsLoading);
}