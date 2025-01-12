import { create } from "zustand";

interface IManualJson {
  json: string;
  changeJson: (val: string) => void;
  isValidJson: boolean;
  changeIsValidJson: (val: boolean) => void;
}

const useManualJson = create<IManualJson>((set) => ({
  json: `{
    "products": [
      {
        "id": 0,
        "name": "Intel Core Ultra 9",
        "price": 499.9
      }
    ]
}`,
  isValidJson: true,
  changeIsValidJson: (val: boolean) =>
    set((state: any) => ({ isValidJson: val })),
  changeJson: (val: string) => set((state: any) => ({ json: val })),
}));

export default useManualJson;
