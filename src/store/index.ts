import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPageConfig, PageConfigSlice } from "./createPageConfig";

import { createUserConfig, UserConfigSlice } from "./createUserConfig";

type StoreState = UserConfigSlice & PageConfigSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUserConfig(...a),
      ...createPageConfig(...a),
    }),
    {
      name: "sala",
    }
  )
);
