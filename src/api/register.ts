import axios from "axios";
import Cookies from "js-cookie";

export async function registerIndividual(userData) {
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

export async function registerCorporate(userData) {
  try {
    const response = await axios.post(
      "http://localhost:8000/register/corporate/",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

