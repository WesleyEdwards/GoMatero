export type LatLng = {
  lat: number;
  lng: number;
};

type UUID = string;

export type MateSession = {
  id: UUID;
  owner: UUID;
  title: string;
  description: string;
  date: Date;
  attendedMembers: UUID[];
  image: string;
  location: LatLng;
};

export type PublicUser = {
  uid: string;
  name: string;
  email: string;
};
