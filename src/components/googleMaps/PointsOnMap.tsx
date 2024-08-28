import { calculateOverallAverageRating } from "@/lib/utils";
import { IHome } from "@/types";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Star } from "lucide-react";
import { useState } from "react";
import HomeCarousel from "../general-components/HomeCarousel";

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
              <div
                className={` p-2 rounded-full shadow-sm text-[16px] shadow-black font-montserrat font-600 transition-transform transform hover:scale-105 ${
                  openId === point._id
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                ${point.price}
              </div>
            </AdvancedMarker>
            {openId === point._id && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpenId(null)}
              >
                <div className="font-montserrat">
                  <HomeCarousel
                    images={point.imgUrls}
                    name={point.name}
                    homeId={point._id}
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
