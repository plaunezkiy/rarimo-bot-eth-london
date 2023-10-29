import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 flex gap-6 items-center px-4 border-b shadow-lg">
      <a href="/" className="text-xl font-medium tracking-tight">
        Rarimo Discord Bot
      </a>
      <p className="">by</p>
      <a
        className="text-xl font-semibold group flex duration-150 transition-all animate-shimmer"
        href="https://dvstr.net"
      >
        <p>D</p>
        <p className="md:opacity-0 md:w-0 md:group-hover:w-3 md:group-hover:opacity-100 duration-150 transition-all ease-out">
          e
        </p>
        <p>vst</p>
        <p className="md:opacity-0 md:w-0 md:group-hover:w-3 md:group-hover:opacity-100 duration-150 transition-all ease-out">
          e
        </p>
        <p>r</p>
      </a>
    </nav>
  );
};

export default Navbar;
