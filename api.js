// AXIOS ERROR RESPONSE BODY: console.log(err.response.data.msg);

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

export const getFavourites = (volUserId, token) => {
  console.log("In api get favourites!");

  return voluntierApi
    .get(`favourites/${volUserId}/listings`, getAuthHeader(token))
    .then(({ data }) => {
      return data.favourite_listings;
    });
};

export const postFavourite = (list_id, vol_id, token) => {
  console.log("Posting favourite!");

  return voluntierApi
    .post(
      `favourites/${vol_id}/listings`,
      { list_id: list_id },
      getAuthHeader(token)
    )
    .then(({ data }) => {
      return data.favourite_listing;
    });
};

export const deleteFavourite = (list_id, vol_id, token) => {
  console.log("Deleting favourite!");

  const authHeaders = getAuthHeader(token).headers;
  const obj = { data: { list_id: list_id }, headers: authHeaders };

  return voluntierApi
    .delete(`favourites/${vol_id}/listings`, obj)
    .then(({ data }) => {
      return data.favourite;
    });
};

export const getBadgeLeaderboard = () => {
  return voluntierApi.get("leaderboard").then(({ data }) => {
    return data.leaderboard;
  });
};

export const postListing = (listingData, token) => {
  console.log(listingData);

  return voluntierApi
    .post("/listings", listingData, getAuthHeader(token))
    .then(({ data }) => {
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
