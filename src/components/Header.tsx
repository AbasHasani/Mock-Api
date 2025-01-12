import { Moon } from "lucide-react";
import Image from "next/image";
import { SwitchTheme } from "@/components/ThemeSwitch";
import Link from "next/link";
const Header = () => {
  return (
    <div className="container mx-auto border-b">
      <nav className="flex justify-between">
        <div className="flex-1 flex">
          <div className="border-x inline-flex items-center h-full md:pr-2">
            <Image
              src={"/favicon.png"}
              className="w-[3rem]"
              width={100}
              height={100}
              alt="app-logo"
            />
            <p className="md:block hidden">Mock-Api Generator</p>
          </div>
        </div>
        <ul className="flex flex-1 md:justify-end">
          <li className="p-5 py-4 border-x">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="p-5 py-4 border-x">
            <Link href={"/docs"}>Docs</Link>
          </li>
          <li className="p-5 py-4 border-x">About</li>
          <li className="px-5 flex items-center border-x">
            <SwitchTheme />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
