
import axios from "axios";
export default async function vehicle(userData) {
    try {
      const response = await axios.post(
        "http://localhost:8000/register/individual/",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  