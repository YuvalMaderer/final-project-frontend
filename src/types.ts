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
    _id: string;
    name: string;
    type: string;
    capacity: number;
    imgUrls: string[];
    price: number;
    summary: string;
    amenities: string[];
    bathrooms: number;
    bedrooms: number;
    beds: number;
    roomType: string;
    host: IHost;
    loc: ILocation;
    reviews: IReview[];
    likedByUsers: string[];
    bookingOptions: BookingOptions;
  }

  export type BookingOptions = {
    InstantBook: boolean;
    SelfCheckIn: boolean;
    AllowsPets: boolean;
  };

// src/types.ts
export interface QueryFilter {
  type?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
  beds?: string;
  bathrooms?: string;
  hostLanguage?: string;
  amenities?: string[];
  capacity?: number;
  accessibility?: boolean | undefined;
  bookingOptions: BookingOptions
  location?: string;
  startDate?: Date;
  endDate?: Date;
}