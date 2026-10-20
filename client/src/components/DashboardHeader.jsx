import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  faLayerGroup,
  faMagnifyingGlass,
  faBell,
  faUser,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardHeader({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // Connect this to your backend logout endpoint
    // when your logout route is available.
    navigate("/signin", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070908]/90 backdrop-blur-xl py-4">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand */}
        <Link to="/onboarding" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#071009] shadow-[0_0_25px_rgba(52,211,153,0.12)]">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Info<span className="text-emerald-400">Deck</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/onboarding"
            className="text-sm font-medium text-emerald-400"
          >
            Overview
          </Link>

          <Link
            to="/notes"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            My Library
          </Link>

          <Link
            to="/explore"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Explore
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            onClick={() => navigate("/notes")}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-gray-400 transition hover:border-emerald-400/30 hover:text-emerald-400 sm:flex"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-gray-400 transition hover:text-white sm:flex"
          >
            <FontAwesomeIcon icon={faBell} />
          </button>

          <div className="hidden h-9 w-px bg-white/10 sm:block" />

          {/* User profile */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="max-w-32">
              <p className="truncate text-sm font-semibold text-white">
                {user?.fname || "Your account"}
              </p>
              <p className="text-xs text-gray-500">Personal workspace</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            title="Sign out"
            aria-label="Sign out"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-red-400/10 hover:text-red-400 sm:flex"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 md:hidden"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-white/[0.06] bg-[#0b0e0c] px-5 py-5 md:hidden">
          <div className="mb-4 flex items-center gap-3 border-b border-white/[0.06] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div>
              <p className="font-semibold text-white">
                {user?.fname || "Your account"}
              </p>
              <p className="text-xs text-gray-500">Personal workspace</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <Link
              to="/onboarding"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-400"
            >
              Overview
            </Link>

            <Link
              to="/notes"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
            >
              My Library
            </Link>

            <Link
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5"
            >
              Explore
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-400 hover:bg-red-400/10"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
