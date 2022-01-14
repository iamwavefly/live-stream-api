export interface userTypes {
  fullname: string;
  email: string;
  password: string;
  user_id: number;
  createdAt: Date | string;
  streams: any;
  googleId: string;
  image: string;
  linked_accounts?: {};
  stream_videos: [];
}
