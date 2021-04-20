export type fbPostProp = {
  image: string | null;
  text: string;
  posted: boolean;
  schedlue: Date;
};

export type igPostProp = {
  image: string;
  text: string;
  posted: boolean;
  schedlue: Date;
};

export type twPostProp = {
  image: string | null;
  text: string;
  posted: boolean;
  schedlue: Date;
};

export type Response = {
  success: boolean;
  message?: string;
  err?: any;
  data?: any;
};
