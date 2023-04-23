type LatLang = {
  lat: number;
  lng: number;
};

type UUID = string;

type MateSession = {
  id: UUID;
  owner: UUID;
  title: string;
  description: string;
  date: Date;
  attendedMembers: UUID[];
  image: string;
  location: LatLang;
};

export type PublicUser = {
  uid: string;
  name: string;
  email: string;
};
