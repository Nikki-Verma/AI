import { StateCreator } from "zustand";

type PageConfigType = {
  pageTitle: string;
  pageDescription: string;
};

export const INITIAL_PAGE_STATE = {
  pageTitle: "",
  pageDescription: "",
};

export const INITIAL_PAGE_HEADER = "";

export interface PageConfigSlice {
  pageConfig: PageConfigType;
  updatePageConfig: (updateConfigParams: PageConfigType) => void;
  resetPageConfig: () => void;
  headerTitle: string;
  resetHeaderTitle: () => void;
  updateHeaderTitle: (updatedHeaderTitle: string) => void;
}

export const createPageConfig: StateCreator<PageConfigSlice> = (set, get) => ({
  pageConfig: INITIAL_PAGE_STATE,
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
    set({ pageConfig: { ...INITIAL_PAGE_STATE } });
  },
  headerTitle: INITIAL_PAGE_HEADER,
  updateHeaderTitle(updatedHeaderTitle: string) {
    set((prev: any) => {
      return {
        ...prev,
        headerTitle: updatedHeaderTitle,
      };
    });
  },
  resetHeaderTitle() {
    set({ headerTitle: "" });
  },
});
