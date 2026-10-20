import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBookOpen,
  faFileLines,
  faGlobe,
  faArrowRight,
  faLightbulb,
  faPenToSquare,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

import DashboardHeader from "../components/DashboardHeader";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const getProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/api/profile`,
          {
            method: "GET",
            credentials: "include",
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          navigate("/signin", { replace: true });
          return;
        }

        // Supports either { fname: "..." } or { user: { fname: "..." } }
        const profile = data.user ?? data;
        setUser(profile);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Profile request failed:", error);
        setError("We couldn't load your workspace. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getProfile();

    return () => controller.abort();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070908]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
          <p className="text-sm text-gray-500">
            Preparing your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070908] text-white">
      <DashboardHeader user={user} />

      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Welcome section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0d100e] p-7 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/[0.09] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-56 w-56 rounded-full bg-emerald-500/[0.05] blur-[90px]" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-400">
                <FontAwesomeIcon icon={faLightbulb} />
                Your personal knowledge space
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back
                <span className="text-emerald-400">
                  {user?.fname ? `, ${user.fname}` : ""}
                </span>
                .
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                Your ideas deserve a place to grow. Capture what you learn,
                organize your knowledge, and share your best insights with
                the world.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/notes/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#071009] transition hover:bg-emerald-300"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Create a note
                </Link>

                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <FontAwesomeIcon icon={faCompass} />
                  Explore ideas
                </Link>
              </div>
            </div>

            <div className="hidden h-40 w-40 shrink-0 items-center justify-center rounded-[2rem] border border-emerald-400/15 bg-emerald-400/[0.04] md:flex lg:h-48 lg:w-48">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-6xl text-emerald-400/80 lg:text-7xl"
              />
            </div>
          </div>
        </section>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-4 text-sm text-red-300"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="font-semibold underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {/* Overview heading */}
        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Your overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                A quick look at your knowledge workspace.
              </p>
            </div>

            <Link
              to="/notes"
              className="inline-flex items-center gap-2 text-sm text-emerald-400 transition hover:text-emerald-300"
            >
              Open my library
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <OverviewCard
              icon={faFileLines}
              label="My notes"
              value="—"
              description="Your saved thoughts and drafts"
              iconStyle="bg-emerald-400/10 text-emerald-400"
            />

            <OverviewCard
              icon={faGlobe}
              label="Published articles"
              value="—"
              description="Knowledge you've shared publicly"
              iconStyle="bg-sky-400/10 text-sky-400"
            />

            <OverviewCard
              icon={faBookOpen}
              label="Saved resources"
              value="—"
              description="Ideas and content worth revisiting"
              iconStyle="bg-violet-400/10 text-violet-400"
            />
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Your counts will appear here once the notes, publishing, and
            saved-resources features are connected to your backend.
          </p>
        </section>

        {/* Quick actions */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Pick up where you left off</h2>
            <p className="mt-1 text-sm text-gray-500">
              What would you like to do today?
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <QuickAction
              to="/notes/new"
              icon={faPenToSquare}
              title="Capture an idea"
              description="Write a note before that thought slips away."
              action="Create a note"
            />

            <QuickAction
              to="/explore"
              icon={faCompass}
              title="Discover something new"
              description="Explore articles and ideas shared by others."
              action="Explore Infodeck"
            />
          </div>
        </section>

        {/* Recent activity placeholder */}
        <section className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Recently updated</h2>
              <p className="mt-1 text-sm text-gray-500">
                Your latest notes and articles will appear here.
              </p>
            </div>

            <Link
              to="/notes"
              className="text-sm text-gray-400 transition hover:text-emerald-400"
            >
              View all
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-14 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] text-gray-500">
              <FontAwesomeIcon icon={faBookOpen} className="text-xl" />
            </div>

            <h3 className="font-semibold text-gray-200">
              Your library starts here
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Create your first note, keep your ideas organized, and build
              a knowledge library that grows with you.
            </p>

            <Link
              to="/notes/new"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Create your first note
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} InfoDeck. Your knowledge, organized.
          </p>
          <p>Built for curious minds.</p>
        </footer>
      </main>
    </div>
  );
}

function OverviewCard({ icon, label, value, description, iconStyle }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d100e] p-5 transition hover:border-white/[0.13]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-gray-500">{description}</p>
    </div>
  );
}

function QuickAction({ to, icon, title, description, action }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-white/[0.07] bg-[#0d100e] p-6 transition hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-[#101511]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
        <FontAwesomeIcon icon={icon} />
      </div>

      <h3 className="mt-5 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
        {action}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
