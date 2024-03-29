function fetchData(url: string, init: Parameters<typeof fetch>[1]) {
  try {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, init);
  } catch (e) {
    // Todo implement error
    throw e;
  }
}

export default fetchData;
