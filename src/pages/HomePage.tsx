import FilterModal from "@/components/general-components/FilterComponent";
import HomesList from "@/components/general-components/HomesList";
import SearchComponent from "@/components/general-components/SearchComponent";
import GoogleMap from "@/components/googleMaps/GoogleMap";
import { fetchHomes } from "@/lib/http";
import { IHome, QueryFilter } from "@/types"; // Ensure QueryFilter is imported
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilters: QueryFilter = {
    type: undefined,
    roomType: undefined,
    bookingOptions: {
      InstantBook: false,
      SelfCheckIn: false,
      AllowsPets: false,
    },
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    beds: undefined,
    bathrooms: undefined,
    hostLanguage: undefined,
    amenities: undefined,
    capacity: undefined,
    accessibility: undefined,
    location: undefined,
    startDate: undefined,
    endDate: undefined,
  };

  // Merge function for setting searchParams
  const updateSearchParams = (
    newParams: Record<string, string | undefined>
  ) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const mergedParams = { ...currentParams, ...newParams };

    // Remove any keys with undefined values (optional)
    Object.keys(mergedParams).forEach(
      (key) => mergedParams[key] === undefined && delete mergedParams[key]
    );

    // Convert mergedParams back to URLSearchParams
    const searchParamsObject = new URLSearchParams(
      mergedParams as Record<string, string>
    );

    setSearchParams(searchParamsObject);
  };

  const filters: QueryFilter = {
    ...defaultFilters,
    ...Object.fromEntries(searchParams.entries()),
  };

  const { data: homes } = useQuery<IHome[]>({
    queryKey: ["homes", filters],
    queryFn: () => fetchHomes(filters),
  });

  return (
    <>
      <SearchComponent
        searchParams={searchParams}
        setSearchParams={updateSearchParams} // Use the new merging function
      />
      <button onClick={() => setModalOpen(true)}>Open Filters</button>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        setSearchParams={updateSearchParams} // Use the new merging function
        initialFilters={defaultFilters}
      />
      <HomesList homes={homes} />
      <GoogleMap homes={homes} />
    </>
  );
}

export default HomePage;
