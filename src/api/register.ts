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

export const checkEmail = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/accounts/accounts/check_email/",
      { email_address: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Axios automatically parses the response as JSON
    if (response.status === 200) {
      console.log(response.data.message);
    } else {
      console.error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
