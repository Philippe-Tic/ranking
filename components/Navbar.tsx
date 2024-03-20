import { useUserContext } from "@/app/layout";
import Image from "next/image";

export const Navbar = () => {
  const { user } = useUserContext();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {
          user && (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Mes ranks</a></li>
              </ul>
            </div>
          )
        }
        <a className="btn btn-ghost text-xl">KingRank</a>
      </div>
      {
        user && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href="/my-ranks">Mes ranks</a></li>
            </ul>
          </div>
        )
      }
      <div className="navbar-end">
        {
          user ? (
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image width="20" height="20" alt="Tailwind CSS Navbar component" src={user?.user_metadata?.avatar_url} />
              </div>
            </div>
          ) : (
            <div className="btn btn-ghost">
              <a href="/login">Login</a>
            </div>
          )
        }
      </div>
    </div>
  );
}