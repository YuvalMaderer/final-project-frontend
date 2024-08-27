import { calculateOverallAverageRating } from "@/lib/utils";
import { IHome } from "@/types";
import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { Star } from "lucide-react";
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
                <div className="rounded-lg font-montserrat">
                  <img
                    src={point.imgUrls[0]}
                    alt="image"
                    className="w-[327px] h-[212px] pb-2"
                  />
                  <div className="flex justify-between items-center">
                    <p className="font-500">{point.loc.address}</p>
                    <div className="flex items-center gap-1">
                      <Star fill="black" width="14px" />
                      <p className="text-xs font-500">
                        {calculateOverallAverageRating(point.reviews)}
                      </p>
                    </div>
                  </div>
                  <p className="font-400">
                    <span className="font-500">${point.price}</span> night
                  </p>
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
