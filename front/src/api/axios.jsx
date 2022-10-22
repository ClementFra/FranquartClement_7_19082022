import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
});
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
const postsUrl = "http://localhost:8000/api/post/";

export const fetchPosts = () => {
  const token = localStorage.getItem("token");
  
  return axios.get(postsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPost = (newPost) =>
axios.post(postsUrl, newPost, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const updatePost = (id, updatedPost) => {
  const token = localStorage.getItem("token");

  return axios.put(`${postsUrl}${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const deletePost = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${postsUrl}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const likePost = (id, updatedPost) => {
  const token = localStorage.getItem("token");

  return axios.post(`${postsUrl}${id}/like`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}