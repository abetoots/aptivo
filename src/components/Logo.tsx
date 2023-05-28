import Image from "next/image";
import ImageLogo from "~/assets/logo-no-background.png";
import { cn } from "~/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative max-w-fit", className)}>
      <Image src={ImageLogo} width={100} alt="Aptivo Logo" />
      <div className="absolute -left-3 top-0 rounded border-2 border-accent-3 px-1 text-xs font-extrabold uppercase md:-right-12 md:left-auto">
        Beta
      </div>
    </div>
  );
};

export default Logo;
