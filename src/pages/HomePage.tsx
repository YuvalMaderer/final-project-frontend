import FilterModal from "@/components/general-components/FilterComponent";
import HomesList from "@/components/general-components/HomesList";
import SearchComponent from "@/components/general-components/SearchComponent";
import { useState } from "react";

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SearchComponent />
      <button onClick={() => setModalOpen(true)}>open filters</button>
      <FilterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <HomesList />
    </>
  );
}

export default HomePage;
