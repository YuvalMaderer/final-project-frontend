import api from "@/services/api.service";
import { IHome, IWishlist, IWishlistResponse, QueryFilter } from "@/types";

// Utility function to safely convert filters to query params
function serializeFilters(filters: QueryFilter): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value)); // Convert all values to strings
    }
  });

  return params;
}

export async function fetchHomes(filters: QueryFilter): Promise<IHome[]> {
  try {
    const params = serializeFilters(filters);
    const response = await api.get(`/homes/filters?${params.toString()}`);

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

export async function fetchHomeCountByFilers(filters: QueryFilter): Promise<number> {
    try {
        const params = serializeFilters(filters);
        const response = await api.get(`/homes/count?${params.toString()}`);
    
        return response.data; // Return the data property which should contain the array of homes
      } catch (err) {
        console.error(err);
        throw err; // Optionally rethrow the error to handle it in the caller
      }
}

export async function fetchUserWishlists(userId: string): Promise<IWishlist[]> {
  try {
    const response = await api.get(`/user/getWishlist?userId=${userId}`);
    return response.data; // Return the data property which should contain the list of wishlists
  } catch (err) {
    console.error('Error fetching user wishlists:', err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

export async function addToWishlist(userId: string, homeId: string, title: string): Promise<void> {
  try {
    await api.post(`/user/addToWishlist`, { userId, homeId, title });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

export async function fetchWishlistByName(
  userId: string,
  name: string
): Promise<IWishlistResponse | null> {
  try {
    const response = await api.get<IWishlistResponse>(
      `/user/getWishlistByName?userId=${userId}&title=${name}`
    );

    return response.data; // Return the data property which should contain the wishlist
  } catch (err) {
    console.error("Error fetching wishlist by name:", err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

