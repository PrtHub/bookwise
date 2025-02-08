"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 w-full flex justify-between gap-5">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-2xl font-semibold text-white font-ibm-plex-sans">
          BookWise
        </p>
      </Link>

      <ul className="flex items-center gap-8">
        <li>
          <Link
            href=""
            className={cn(
              "text-base font-medium capitalize cursor-pointer",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href="my-profile"
          >
           <Avatar>
            <AvatarFallback className="uppercase bg-amber-100">
              {session?.user?.name?.slice(0, 2)}
            </AvatarFallback>
           </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
