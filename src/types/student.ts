type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

export type Student = {
  id: number;
  name: string;
  username: string;
  schoolId: number;
  legalguardianId: number;
  schoolName?: string;
  legalguardianName?: string;
  address?: Address;
};
