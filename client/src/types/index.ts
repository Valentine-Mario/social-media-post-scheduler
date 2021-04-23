export type Post = {
  id: string;
  image: string | null;
  text: string;
  posted: boolean;
  schedlue: Date;
};

export type Response = {
  success: boolean;
  message?: string;
  err?: any;
  data?: Post[];
};
