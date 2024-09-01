import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { addToWishlist, fetchHomeById, fetchUserWishlists } from "@/lib/http";
import { useAuth } from "@/providers/user.context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { IHome, IWishlist, IWishlistResponse } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface HomeCarouselProps {
  images: string[];
  name: string;
  homeId: string; // Home ID passed as a prop
}

type EmblaCarouselApi = UseEmblaCarouselType[1];

function HomeCarousel({ images, name, homeId }: HomeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselApi | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { loggedInUser } = useAuth();
  const [homeData, setHomeData] = useState<{ [key: string]: IHome }>({});
  const userId = loggedInUser?.user._id;
  const [newWishlistName, setNewWishlistName] = useState<string>("");
  const [isCreateNewWishlist, setIsCreateNewWishlist] =
    useState<boolean>(false);

  const { data } = useQuery<IWishlistResponse, Error>({
    queryKey: ["userWishlists", userId],
    queryFn: () => fetchUserWishlists(userId),
    enabled: !!userId,
  });

  const userWishlists = data?.wishlists || [];

  useEffect(() => {
    // Function to fetch home details for all item IDs
    const fetchHomes = async () => {
      const homes: { [key: string]: IHome } = {};
      for (const wishlist of userWishlists) {
        for (const itemId of wishlist.list) {
          if (!homes[itemId]) {
            try {
              const home = await fetchHomeById(itemId);
              homes[itemId] = home;
            } catch (err) {
              console.error(`Failed to fetch home with ID ${itemId}:`, err);
            }
          }
        }
      }
      setHomeData(homes);
    };

    fetchHomes();
  }, [userWishlists]);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(currentIndex);
    }
  }, [currentIndex, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelectIndex = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", handleSelectIndex);

    return () => {
      emblaApi.off("select", handleSelectIndex);
    };
  }, [emblaApi]);

  const handleAddToWishlist = (
    ev:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    homeId: string,
    userId: string,
    title: string
  ) => {
    ev.preventDefault();
    ev.stopPropagation(); // Prevents event from bubbling up to the Link
    try {
      addToWishlist(userId, homeId, title);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to add home to wishlist:", err);
    }
  };

  function handleChangeWishlistName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewWishlistName(event.target.value);
  }

  return (
    <div className="relative w-72 pb-2">
      <Carousel
        opts={{ loop: false }}
        setApi={(api) => setEmblaApi(api as EmblaCarouselApi)}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Link to={`/homes/${homeId}`}>
                <div className="relative">
                  <img
                    src={img}
                    alt={`${name} - Image ${index + 1}`}
                    className="w-[270px] h-[270px] rounded-lg cursor-pointer"
                  />

                  <Dialog open={isDialogOpen}>
                    <DialogTrigger>
                      <button
                        className="absolute top-2 right-8 z-50 flex items-center justify-center p-1 rounded-full"
                        // Adding stopPropagation here to prevent navigation
                        onClick={(ev) => {
                          ev.stopPropagation(); // Prevents event from bubbling up to the Link
                          ev.preventDefault();
                          setIsDialogOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          className="w-6 h-6 fill-current text-black stroke-white stroke-2"
                        >
                          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
                        </svg>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add to wishlist</DialogTitle>
                        <DialogDescription>
                          {isCreateNewWishlist ? (
                            <div className="space-y-2">
                              <Input
                                value={newWishlistName}
                                onChange={handleChangeWishlistName}
                                placeholder="Name"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                className={cn(
                                  newWishlistName.length > 50 &&
                                    "border-2 border-red-600"
                                )}
                              />
                              <div className="flex justify-between">
                                <p className="text-xs">
                                  {newWishlistName.length}/50
                                </p>
                                {newWishlistName.length > 50 && (
                                  <p className="text-red-600 text-xs">
                                    Over character limit
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 font-montserrat max-h-[33rem] overflow-y-auto">
                              {userWishlists.map((wishlist: IWishlist) => {
                                // Use the first item from the wishlist
                                const firstItemId = wishlist.list[0];
                                const home = homeData[firstItemId];

                                return (
                                  <>
                                    <div
                                      className="cursor-pointer font-montserrat"
                                      key={wishlist.title}
                                      onClick={(ev) =>
                                        handleAddToWishlist(
                                          ev,
                                          homeId,
                                          userId,
                                          wishlist.title
                                        )
                                      }
                                    >
                                      <div>
                                        {home?.imgUrls.length > 0 ? (
                                          <img
                                            src={home.imgUrls[0]}
                                            alt={home.name}
                                            className="w-[210px] h-[210px] border-4 border-white shadow-xl rounded-3xl"
                                          />
                                        ) : (
                                          <div>No images available</div>
                                        )}
                                      </div>
                                      <h2 className="font-600 mt-2 text-black">
                                        {wishlist.title}
                                      </h2>
                                      <h2 className="font-500 mt-1 text-gray-500 text-xs">
                                        {wishlist.list.length} saved
                                      </h2>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        {isCreateNewWishlist ? (
                          <Button
                            variant="new"
                            className="w-full h-12"
                            onClick={(ev) => {
                              ev.preventDefault();
                              handleAddToWishlist(
                                ev,
                                homeId,
                                userId,
                                newWishlistName
                              );
                            }}
                            disabled={newWishlistName.length > 50}
                          >
                            Create
                          </Button>
                        ) : (
                          <Button
                            variant="new"
                            className="w-full h-12"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setIsCreateNewWishlist(true);
                            }}
                            disabled={newWishlistName.length > 50}
                          >
                            Create new wishlist
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-8 top-1/2 transform -translate-y-1/2" />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
