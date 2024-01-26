import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createUserDetails, UserSlice } from "./createUserDetails";

type StoreState = UserSlice; // & OrderSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUserDetails(...a),
      // ...createOrderSlice(...a),
    }),
    {
      name: "sala",
    }
  )
);
