import {
  MediaItemWithOwner,
  User,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';

export type Credentials = Pick<User, 'username' | 'password'>;
export type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;
export type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type UploadInputs = {
  title: string;
  description: string;
};

export type NavigatorType = {
  // tab screen
  'All Media': undefined;
  'My Profile': undefined;
  Upload: undefined;

  // stack screen
  'My Files': undefined;
  'My media app - login': undefined;
  Single: {item: MediaItemWithOwner};
  Tabs: undefined;
};
