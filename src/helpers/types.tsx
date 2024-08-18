export interface PropsChildren {
  children: React.ReactNode;
}

export interface UserInterface {
  name: string;
  age: number;
  gender: string;
  country: string;
  email: string;
  pass: string;
  agreement: boolean;
  image: string;
}

export type UserDataDispatch = {
  userPassRepeat?: string;
  gender?: string;
  userAgreement?: boolean;
  userName: string;
  userAge: number;
  userEmail: string;
  userPass: string;
  userFile: File[];
  userCountry: string;
};

export type ErrorState = {
  userName?: string;
  userAge?: number
  userEmail?: string;
  userPass?: string;
  userPassRepeat?: string;
  gender?: string;
  userAgreement?: boolean;
  userFile?: string;
  userCountry?: string;
};
