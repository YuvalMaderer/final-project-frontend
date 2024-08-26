import { IHome } from "@/types";
import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

export type Props = { points: IHome[] | undefined };

function HomesOnMap({ points }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {points?.map((point) => {
        const position = {
          lat: point.loc.lat,
          lng: point.loc.lan,
        };

        return (
          <div key={point._id}>
            <AdvancedMarker
              position={position}
              onClick={() => setOpenId(point._id)}
            >
              <Pin />
            </AdvancedMarker>
            {openId === point._id && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpenId(null)}
              >
                <div>
                  <p>{point.loc.address}</p>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}
    </>
  );
}

export default HomesOnMap;
