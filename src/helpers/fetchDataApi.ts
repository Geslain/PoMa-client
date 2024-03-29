function fetchDataApi(url: string, init: Parameters<typeof fetch>[1]) {
  try {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}${url}`, init);
  } catch (e) {
    // Todo implement error
    throw e;
  }
}

export default fetchDataApi;
