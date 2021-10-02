import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'https://bilhetapi.azurewebsites.net',
});
