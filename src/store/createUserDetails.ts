import { StateCreator } from "zustand";

type UserDetails = {
  permissions: string[];
  userDetails: any;
};

export const INITIAL_USER_STATE = {
  permissions: [],
  userDetails: {},
};

export interface UserSlice {
  user: UserDetails;
  updateUserDetails: (user: UserDetails) => void;
  resetUserDetails: () => void;
}

export const createUserDetails: StateCreator<UserSlice> = (set, get) => ({
  user: INITIAL_USER_STATE,
  updateUserDetails(userDetails: UserDetails) {
    set((prev: any) => {
      return {
        ...prev,
        user: {
          permissions: userDetails?.permissions,
          userDetails: userDetails?.userDetails,
        },
      };
    });
  },
  resetUserDetails() {
    set({ user: { ...INITIAL_USER_STATE } });
  },
});
