import NavLink from '../client/NavLink';

function NavMenu({ className }: { className?: string }) {
  return (
    <ul tabIndex={0} className={className}>
      <li>
        <NavLink href="/">home</NavLink>
      </li>
      <li>
        <NavLink href="/courier">courier</NavLink>
      </li>
    </ul>
  );
}

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <NavMenu className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavMenu className="menu menu-horizontal px-1" />
      </div>
    </div>
  );
}
