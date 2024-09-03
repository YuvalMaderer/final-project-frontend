import { Home } from "@/layouts/BecomeAhostLayout";
import api from "@/services/api.service";
import {
  IHome,
  IReservation,
  IReservationRequest,
  IReservationResponse,
  IWishlist,
  IWishlistResponse,
  QueryFilter,
} from "@/types";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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

export async function fetchHomeCountByFilers(
  filters: QueryFilter
): Promise<number> {
  try {
    const params = serializeFilters(filters);
    const response = await api.get(`/homes/count?${params.toString()}`);

    return response.data; // Return the data property which should contain the array of homes
  } catch (err) {
    console.error(err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

export async function fetchUserWishlists(
  userId: string | undefined
): Promise<IWishlist[]> {
  try {
    const response = await api.get(`/user/getWishlist?userId=${userId}`);
    return response.data; // Return the data property which should contain the list of wishlists
  } catch (err) {
    console.error("Error fetching user wishlists:", err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

export async function addToWishlist(
  userId: string,
  homeId: string,
  title: string
): Promise<void> {
  try {
    await api.post(`/user/addToWishlist`, { userId, homeId, title });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
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

export async function createNewHome(newHome: Home) {
  try {
    const response = await api.post(`/homes/create`, newHome);

    return response.data; // Return the data property
  } catch (err) {
    console.error("Error create new home :", err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

export async function createNewReservation(
  reservation: IReservationRequest
): Promise<IReservationResponse> {
  try {
    const response = await api.post<IReservationResponse>(
      `/reservation/create`,
      reservation
    );
    return response.data;
  } catch (err) {
    console.error("Error creating new reservation:", err);
    throw err;
  }
}

export const fetchHomeReservations = async (
  homeId: string
): Promise<IReservation[]> => {
  try {
    const response = await api.get(`/reservation/${homeId}`);
    return response.data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse response data");
  }
};

export async function removeFromWishlist(
  title: string,
  homeId: string,
  userId: string
): Promise<void> {
  try {
    await api.delete(`/user/removeFromWishlist`, {
      data: { title, homeId, userId }, // Use `data` instead of `params`
    });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    throw err; // Optionally rethrow the error to handle it in the caller
  }
}

export async function getAllHostReservations() {
  try {
    const response = await api.get(`/reservation/host`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching host reservations:", error);

    // Attach the response status to the error
    if (error.response) {
      error.status = error.response.status;
    }

    throw error;
  }
}

export async function getAllUserReservations() {
  try {
    const response = await api.get(`/reservation/user`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user reservations:", error);

    // Attach the response status to the error
    if (error.response) {
      error.status = error.response.status;
    }

    throw error;
  }
}

export async function updateReservationStatus(
  reservationId: string,
  status: string
) {
  try {
    const response = await api.patch(
      `/reservation/updateStatus/${reservationId}`,
      {
        status, // Send the status in the request body as an object
      }
    );

    // Optionally, you can handle the response here if needed
    return response.data; // Return the updated reservation data
  } catch (error) {
    console.error("Error updating reservation status:", error);
    // Handle the error, e.g., show an error message to the user
    throw error; // Optionally re-throw the error to be handled by the caller
  }
}
