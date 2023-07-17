import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfoState {
    userInfo: { userName: string; userEmail: string };
    setUserInfo: (name: string, userEmail: string) => void;
}

const useUserInfoStore = create<UserInfoState>()(
    persist(
        set => ({
            userInfo: { userName: '', userEmail: '' },
            setUserInfo: (name, email) => {
                set(() => ({
                    userInfo: {
                        userName: name,
                        userEmail: email
                    }
                }));
            }
        }),
        { name: 'fp-user-info' }
    )
);

export default useUserInfoStore;
