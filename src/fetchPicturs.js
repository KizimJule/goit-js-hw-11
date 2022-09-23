import axios from 'axios';

export { fetchPicturs };

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchPicturs(name, page, perPage) {
  try {
    const response = await axios.get(
      `?key=24543353-3824dfbf23e7b5ead533e5f72&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
}
