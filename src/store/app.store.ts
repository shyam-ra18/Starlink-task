import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      orbit: null,
      removedIds: [],

      setOrbitData: (newOrbit: any) => set({ orbit: newOrbit }),
      changeOrbitData: (id: number) =>
        set((state: any) => ({
          orbit: state.orbit ? { ...state.orbit, id } : null,
        })),
      deleteStarLink: (id: string) =>
        set((state: any) => ({
          removedIds: [...state.removedIds, id],
        })),
    }),
    {
      name: "orbit-storage",
      getStorage: () => localStorage,
    }
  )
);
