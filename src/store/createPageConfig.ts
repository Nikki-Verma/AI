import { StateCreator } from "zustand";

type PageConfigType = {
  pageTitle: string;
  pageDescription: string;
};

export const INITIAL_USER_STATE = {
  pageTitle: "",
  pageDescription: "",
};

export interface PageConfigSlice {
  pageConfig: PageConfigType;
  updatePageConfig: (updateConfigParams: PageConfigType) => void;
  resetPageConfig: () => void;
}

export const createPageConfig: StateCreator<PageConfigSlice> = (set, get) => ({
  pageConfig: INITIAL_USER_STATE,
  updatePageConfig(updateConfigParams: any) {
    set((prev: any) => {
      return {
        ...prev,
        pageConfig: {
          pageTitle: updateConfigParams?.pageTitle,
          pageDescription: updateConfigParams?.pageDescription,
        },
      };
    });
  },
  resetPageConfig() {
    set({ pageConfig: { ...INITIAL_USER_STATE } });
  },
});
