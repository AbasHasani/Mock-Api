import { create } from "zustand";

interface User {
  name: string;
  image: string;
  id: string;
}

export const useUserStore = create<User>((set) => ({
  name: "",
  image: "",
  id: "",
  signUser: (values: User) =>
    set((state) => ({
      id: values.id,
      image: values.image,
      name: values.name,
    })),
}));
