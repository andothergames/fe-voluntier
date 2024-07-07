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
  return voluntierApi
    .get(`listings?org_id=${orgId}`, getAuthHeader(token))
    .then(({ data }) => {
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

export const postFavourite = (list_id, vol_id, token) => {
  return voluntierApi
    .post(`favourites/${vol_id}/listings`, { list_id }, getAuthHeader(token))
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getBadgeLeaderboard = () => {
  return voluntierApi.get("leaderboard").then(({ data }) => {
    return data.leaderboard;
  });
};

export const postListing = (listingData, token) => {
  return voluntierApi.post("/listings").then(({ data }) => {
    return data.listing;
  });
};

export const getSkillsOptions = () => {
  return voluntierApi.get("/skills").then(({ data }) => {
    return data.skills;
  });
};

export const getSkillsForListId = (listId) => {
  return voluntierApi.get(`/skills/${listId}`).then(({ data }) => {
    return data.skills;
  });
};

const imgCache = new Map();
export const getB64Image = (imgId) => {
  if (imgCache.has(imgId)) {
    return Promise.resolve(imgCache.get(imgId));
  }

  return voluntierApi.get(`images/${imgId}`).then(({ data }) => {
    // Cache image
    imgCache.set(imgId, data.image);

    return data.image;
  });
};
