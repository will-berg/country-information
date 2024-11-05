import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCountryStore = create(
    persist(
        (set) => ({
            countries: [],
            setCountries: (countries) => set({ countries }),
        }),
        {
            name: "countries",
            getStorage: () => createJSONStorage(() => sessionStorage),
        }
    )
);
