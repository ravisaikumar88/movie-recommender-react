import axios from "axios";

export default axios.create({
  baseURL: "https://movie-recommender-react-production.up.railway.app/api",
});
