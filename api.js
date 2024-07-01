import axios from 'axios';

const voluntierApi = axios.create({
  baseURL: 'https://voluntier-api.codermatt.com/api/',
});

export const getListings = () => {
  return voluntierApi.get('/listings').then(({ data }) => {
    return data.listings;
  });
};
