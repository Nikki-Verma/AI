import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createUserConfig, UserConfigSlice } from "./createUserConfig";

type StoreState = UserConfigSlice; // & OrderSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUserConfig(...a),
      // ...createOrderSlice(...a),
    }),
    {
      name: "sala",
    }
  )
);
