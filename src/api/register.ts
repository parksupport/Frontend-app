import axios from "axios";
import Cookies from 'js-cookie'; 

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


export async function loginUser(userData) {
  const csrfToken = Cookies.get('csrftoken'); 

  console.log("userData: " + JSON.stringify(userData));

  try {
    const response = await axios.post(
      'http://localhost:8000/api-auth/login/',
      {
        email: userData.email,
        password: userData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken, 
        withCredentials: true, 
    );

    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response); 
  }
}

