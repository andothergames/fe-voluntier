import axios from "axios";

const voluntierApi = axios.create({
  baseURL: "https://voluntier-api.codermatt.com/api/",
});

// const voluntierApi = axios.create({
//   baseURL: "http://localhost:9090/api/",
// });

export const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const login = (body) => {
  return voluntierApi
    .post("login", body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getListings = () => {
  return voluntierApi.get("listings").then(({ data }) => {
    return data.listings;
  });
};

export const getOrgListings = (orgId, token) => {
  return voluntierApi.get(`listings?org_id=${orgId}`, getAuthHeader(token)).then(({ data }) => {
    return data.listings;
  });
};

export const getBadges = () => {
  return voluntierApi.get("badges").then(({ data }) => {
    return data.badges;
  });
};

export const getMyBadges = (volId, token) => {
  return voluntierApi
    .get(`badges/${volId}`, getAuthHeader(token))
    .then(({ data }) => {
      return data.badges;
    });
};

export const getBadgeLeaderboard = () => {
  return voluntierApi.get("leaderboard").then(({ data }) => {
    return data.leaderboard;
  });
};
