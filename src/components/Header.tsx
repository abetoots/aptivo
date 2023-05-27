//Components
import Logo from "~/components/Logo";
import Link from "next/link";

//Misc
import React from "react";
import { cn } from "~/lib/utils";

const Header = (props: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <header
      className={cn(
        "flex bg-transparent p-5 md:px-14 md:py-8",
        props.className
      )}
    >
      <Link href="/">
        <Logo />
      </Link>
      {props.children}
    </header>
  );
};

export default Header;
