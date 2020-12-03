export function tbdFetch(url, data, handler, setIsLoading) {
  setIsLoading(true);
  fetch(url, data)
    .then(r => {
      handler(r)
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false));
}

