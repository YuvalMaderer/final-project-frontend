import { useState } from "react";
import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import HomesOnMap from "./PointsOnMap";
import { IHome } from "@/types";

const googleApiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface GoogleMapProps {
  homes: IHome[] | undefined;
  position: { lat: number; lng: number };
}

export default function GoogleMap({ homes, position }: GoogleMapProps) {
  const [open, setOpen] = useState(false);

  if (!position) {
    // Optionally, you can return a loading indicator while the location is being fetched
    return <div>Loading...</div>;
  }

  if (!googleApiKey) return;

  return (
    <APIProvider apiKey={googleApiKey}>
      <div style={{ height: "80vh", width: "80%" }}>
        <Map
          defaultZoom={13}
          defaultCenter={position}
          mapId={"aa21e74a7cd52a60"}
          fullscreenControl={false}
        >
          {/* <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin />
          </AdvancedMarker> */}
          {open && (
            <InfoWindow
              position={position}
              onCloseClick={() => setOpen(false)}
            ></InfoWindow>
          )}
          <HomesOnMap points={homes} />
        </Map>
      </div>
    </APIProvider>
  );
}
