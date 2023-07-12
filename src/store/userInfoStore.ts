import { create } from 'zustand';

interface UserInfo {
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
}

const userInfoStore = create<UserInfo>(set => ({
  userName: 'none',
  setUserName: name => {
    set(state => ({
      ...state,
      userName: name
    }));
  },

  userEmail: 'none',
  setUserEmail: email => {
    set(state => ({
      ...state,
      userEmail: email
    }));
  }
}));

export default userInfoStore;
