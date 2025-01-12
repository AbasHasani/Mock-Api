import { create } from "zustand";

interface IAIJson {
  json: string;
  changeJson: (val: string) => void;
  isValidJson: boolean;
  changeIsValidJson: (val: boolean) => void;
}

export const useAIJson = create<IAIJson>((set) => ({
  json: "",
  changeJson: (val: string) => set((state: any) => ({ json: val })),
  isValidJson: true,
  changeIsValidJson: (val: boolean) =>
    set((state: any) => ({ isValidJson: val })),
}));
