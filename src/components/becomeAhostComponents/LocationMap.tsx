import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useOutletContext } from "react-router-dom";
import { Home } from "@/layouts/BecomeAhostLayout";
import { googleApi } from "@/lib/googleApiKey";

interface LatLng {
  lat: number;
  lng: number;
}

interface LocationMapProps {
  setSelected: React.Dispatch<React.SetStateAction<LatLng | null>>;
  selected: LatLng | null;
  setLocationData: (address: string, locationData: any) => void;
}

export default function LocationMap({
  setSelected,
  selected,
  setLocationData,
}: LocationMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApi,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      setSelected={setSelected}
      selected={selected}
      setLocationData={setLocationData}
    />
  );
}

function Map({ setSelected, selected, setLocationData }: LocationMapProps) {
  const [newHome, setNewHome] =
    useOutletContext<[Home, React.Dispatch<React.SetStateAction<Home>>]>();
  const [center, setCenter] = useState<LatLng>({ lat: 43.45, lng: -80.49 });

  const handleSelectLocation = useCallback(
    async (location: LatLng | null, address: string) => {
      if (location) {
        setSelected(location);
        setCenter(location);

        const localStorageHome = localStorage.getItem("newHome");

        const homeObject: Home = localStorageHome
          ? JSON.parse(localStorageHome)
          : {};

        const updatedHome = {
          ...homeObject,
          loc: {
            country: "",
            countryCode: "",
            city: "",
            address: "",
            lat: location.lat,
            lan: location.lng,
          },
        };
        setNewHome(updatedHome);
        localStorage.setItem("newHome", JSON.stringify(updatedHome));
        // Get additional location data (like address components)
        const results = await getGeocode({ location });
        const locationData = results[0].address_components;
        setLocationData(address, locationData);
      }
    },
    [setSelected, setLocationData]
  );

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <PlacesAutocomplete setSelected={handleSelectLocation} />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: "15px",
        }}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
}

interface PlacesAutocompleteProps {
  setSelected: (location: LatLng | null, address: string) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  setSelected,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    if (address === "Use current location" && currentLocation) {
      setSelected(currentLocation, "Current Location");
    } else {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng }, address);
    }
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setCurrentLocation(location);
      },
      () => {
        alert("Failed to get your current location");
      }
    );
  };

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        disabled={!ready}
        className=" rounded-full shadow-sm p-5 text-lg focus:outline-none focus:ring-2 focus:ring-black w-full"
        placeholder="Enter your address"
      />
      <ComboboxPopover className="border-none rounded-3xl mt-4">
        <ComboboxList className="bg-white rounded-3xl shadow-lg p-2 font-montserrat ">
          {currentLocation && (
            <ComboboxOption
              value="Use current location"
              className="p-2 hover:bg-gray-100 cursor-pointer"
            />
          )}
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
