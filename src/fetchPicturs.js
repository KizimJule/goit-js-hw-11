import axios from 'axios';

export { fetchPicturs };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30025570-88047e109e19df2adec6469b3';

async function fetchPicturs(name, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return await response.data;
  } catch (error) {
    console.log(error.message);
  }
}
