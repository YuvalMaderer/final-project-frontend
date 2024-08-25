import api from "@/services/api.service";
import { IHome } from "@/types";

export async function fetchHomes(): Promise<IHome[]> {
  try {
    const response = await api.get("/homes/filters");
    return response.data; // Return the data property which should contain the array of homes
  } catch (err) {
    console.error(err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}
export async function fetchHomeById(id: string): Promise<IHome> {
    try {
      const response = await api.get(`/homes/${id}`);
      return response.data; // Return the data property which should contain the home details
    } catch (err) {
      console.error(err);
      throw err; // Optionally rethrow the error to handle it in the caller
    }
  
}