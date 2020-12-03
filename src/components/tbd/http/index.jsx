export function tbdFetch (url, data, handler) {
  // setIsLoading(true);
  fetch(url, data)
    .then(r => {
      handler(r)
      // closeModal();
    })
    .catch(err => console.log(err))
  // .finally(() => setIsLoading(false));
}

