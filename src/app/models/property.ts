export interface Property {
  id: number;
  name: string;
  description: string;
  municipality: string;
  department: string;
  typeOfEntrance: string;
  address: string;
  link: string;
  isAvailable: boolean;
  pricePerNight: number;
  amountOfRooms: number;
  amountOfBathrooms: number;
  amountOfResidents: number;
  isPetFriendly: boolean;
  hasPool: boolean;
  hasGril: boolean;
  ownerEmail: string;
  imageIds: string;
  rating: number;
}