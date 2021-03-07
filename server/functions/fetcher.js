import fetch from 'node-fetch';

async function fetcher(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return {
        error: response.error || 'Error fetching data',
      };
    }
  } catch (error) {
    return {
      error: `Error from server: ${JSON.stringify(error)}`,
    };
  }
}

export default fetcher;
