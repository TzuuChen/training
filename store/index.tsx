import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 定義狀態類型
export interface DataState {
	name: string;
	email: string;
	age: number;
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setAge: (age: number) => void;
}

// 建立store
export const useData = create<DataState>()(
	persist(
		(set) => ({
			name: "",
			email: "",
			age: 0,
			setName: (name) => set({ name }),
			setEmail: (email) => set({ email }),
			setAge: (age) => set({ age }),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
