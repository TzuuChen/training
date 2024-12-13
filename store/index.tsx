import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 定義狀態類型
export interface User {
	name: string;
	email: string;
	age: number;
}

export interface DataState {
	users: User[];
	addUser: (newUser: User) => void;
}

// 建立store
export const useData = create<DataState>()(
	persist(
		(set) => ({
			users: [],
			addUser: (newUser) =>
				set((state) => ({ users: [...state.users, newUser] })),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
