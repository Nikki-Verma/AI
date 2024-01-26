import { StateCreator } from "zustand";

type UserConfigType = {
  siderLocked: boolean;
};

export const INITIAL_USER_STATE = {
  siderLocked: true,
};

export interface UserConfigSlice {
  userConfig: UserConfigType;
  updateUserConfig: (updateConfigParams: any) => void;
  resetUserConfig: () => void;
}

export const createUserConfig: StateCreator<UserConfigSlice> = (set, get) => ({
  userConfig: INITIAL_USER_STATE,
  updateUserConfig(updateConfigParams: any) {
    set((prev: any) => {
      return {
        ...prev,
        userConfig: {
          siderLocked: updateConfigParams?.siderLocked,
        },
      };
    });
  },
  resetUserConfig() {
    set({ userConfig: { ...INITIAL_USER_STATE } });
  },
});
