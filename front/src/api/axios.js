import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
});

const urlPost = "http://localhost:8000/api/post/";

export const fetchPosts = () => {

  const token = localStorage.getItem("token");
     
          return axios.get( urlPost, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });
          
  
}
export const createPost = (newPost) => axios.post(urlPost, newPost, {
  headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
} );