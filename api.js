import axios from 'axios';

const voluntierApi = axios.create({
  baseURL: 'https://voluntier-api.codermatt.com/api/',
});

export const getListings = () => {
  return voluntierApi.get('listings').then(({ data }) => {
    return data.listings;
  });
};

export const login = (body) => {
  return voluntierApi.post('login', body).then(({ data }) => {
    console.log(data);
  })
};

export const logout = () => {
  return voluntierApi.delete('logout').then(() => {
    return;
  })
};
