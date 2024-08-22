export interface IReview {
    at: string | Date;
    by: { id: string; fullname: string; imgUrl: string };
    txt: string;
    rate: {
      Cleanliness: number;
      Communication: number;
      "Check-in": number;
      Accuracy: number;
      Location: number;
      Value: number;
    };
  }
  
  interface ILocation {
    country: string;
    countryCode: string;
    city: string;
    address: string;
    lat: number;
    lan: number;
  }
  
  interface IHost {
    _id: string;
    fullname: string;
    location: string;
    about: string;
    thumbnailUrl: string;
    imgUrl: string;
    isSuperhost: boolean;
  }
  
export interface IHome {
    name: string;
    type: string;
    imgUrls: string[];
    price: number;
    summery: string;
    amenities: string[];
    bathrooms: number;
    bedrooms: number;
    roomType: string;
    host: IHost;
    loc: ILocation;
    reviews: IReview[];
    likedByUsers: string[];
  }