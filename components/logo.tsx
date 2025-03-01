import Link from "next/link";
import { GiMoebiusTriangle } from "react-icons/gi";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <h1 className="flex items-center gap-2 text-lg">
        <GiMoebiusTriangle />
        <span className="font-bold">Logan Keene</span>
      </h1>
    </Link>
  );
};

export default Logo;
