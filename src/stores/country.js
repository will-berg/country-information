import { create } from "zustand";

export const useCountryStore = create((set) => ({
	countries: [],
	setCountries: (countries) => set({ countries }),
}));
