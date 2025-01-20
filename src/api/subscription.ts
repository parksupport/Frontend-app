import { Axios } from "./axios";

// 🚗 **Register Vehicle**
export default async function subscribePlan(userData) {
    console.log("userData", userData)
    const formatedData = {
        "plan_id": userData
    }
  try {
    const response = await Axios.post("/api/subscriptions/subscribe/", formatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}