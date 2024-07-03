import axios from "axios";

const voluntierApi = axios.create({
  baseURL: "https://voluntier-api.codermatt.com/api/",
});

export const getListings = () => {
  return voluntierApi.get("listings").then(({ data }) => {
    return data.listings;
  });
};

export const login = (body) => {
  return voluntierApi
    .post("login", body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const logout = () => {
  return voluntierApi
    .delete("logout")
    .then(() => {
      return;
    })
    .catch((error) => {
      return error;
    });
};

export const getBadges = () => {
  return voluntierApi.get("badges").then(({ data }) => {
    return data.badges;
  });
};

export const getMyBadges = (volId) => {
  return voluntierApi.get(`badges/${volId}`).then(({ data }) => {
    return data.badges;
  });
};

export const getBadgeLeaderboard = () => {
  return voluntierApi.get('leaderboard').then(({ data }) => {
    return data.leaderboard
  })
}
