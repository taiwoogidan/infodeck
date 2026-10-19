
import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faXmark,
  faLayerGroup,
  faMagnifyingGlass,
  faBookmark,
  faFileLines,
  faFolderOpen,
  faShieldHalved,
  faBolt,
  faCheck,
  faLock,
  faGlobe,
  faWandMagicSparkles,
  faArrowUpRightFromSquare,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faBookmark,
    title: "Save what matters",
    description:
      "Keep useful websites, tutorials, articles, and learning resources in one organized place.",
    color: "text-emerald-400",
    background: "bg-emerald-400/10",
  },
  {
    icon: faLayerGroup,
    title: "Organize your knowledge",
    description:
      "Create collections, add tags, and build a personal library that makes sense to you.",
    color: "text-sky-400",
    background: "bg-sky-400/10",
  },
  {
    icon: faFileLines,
    title: "Write and publish",
    description:
      "Turn your ideas into useful notes and articles. Keep them private or share them with others.",
    color: "text-violet-400",
    background: "bg-violet-400/10",
  },
  {
    icon: faMagnifyingGlass,
    title: "Find things faster",
    description:
      "Search your growing library and find the information you need without starting from scratch.",
    color: "text-amber-400",
    background: "bg-amber-400/10",
  },
  {
    icon: faGlobe,
    title: "Share your discoveries",
    description:
      "Publish useful knowledge for other people to discover, learn from, and discuss.",
    color: "text-pink-400",
    background: "bg-pink-400/10",
  },
  {
    icon: faShieldHalved,
    title: "Stay in control",
    description:
      "Manage your content and choose what stays private and what becomes available to others.",
    color: "text-teal-400",
    background: "bg-teal-400/10",
  },
];

const steps = [
  {
    number: "01",
    title: "Collect",
    description:
      "Save the articles, links, resources, and ideas you don't want to lose.",
  },
  {
    number: "02",
    title: "Organize",
    description:
      "Group everything into meaningful collections so your knowledge stays structured.",
  },
  {
    number: "03",
    title: "Discover",
    description:
      "Return to your saved knowledge whenever you need it, or share your best discoveries.",
  },
];

function Brand({ footer = false }) {
  return (
    <Link
      to="/"
      aria-label="Infodeck home"
      className={`inline-flex items-center gap-2.5 ${
        footer ? "" : "shrink-0"
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-lg text-black shadow-lg shadow-emerald-500/15">
        <FontAwesomeIcon icon={faLayerGroup} />
      </span>

      <span className="text-xl font-bold tracking-tight text-white">
        Info<span className="text-emerald-400">deck</span>
      </span>
    </Link>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-emerald-400">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function DashboardPreview() {
  const previewItems = [
    {
      icon: faFileLines,
      title: "Understanding React Hooks",
      category: "Development",
      color: "text-sky-400",
      bg: "bg-sky-400/10",
    },
    {
      icon: faGlobe,
      title: "A Guide to the Web",
      category: "Technology",
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      icon: faBookmark,
      title: "Ideas Worth Exploring",
      category: "Personal",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[570px]">
      <div className="absolute -inset-8 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e0d] shadow-2xl shadow-black/50">
        {/* Fake browser header */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />

          <div className="ml-4 flex flex-1 items-center justify-center rounded-md bg-white/[0.04] px-3 py-1.5 text-[10px] text-zinc-500">
            infodeck.app/dashboard
          </div>
        </div>

        <div className="flex min-h-[340px] sm:min-h-[390px]">
          {/* Preview sidebar */}
          <aside className="hidden w-40 shrink-0 border-r border-white/[0.07] p-4 sm:block">
            <div className="mb-7 flex items-center gap-2 text-xs font-semibold text-white">
              <FontAwesomeIcon
                icon={faLayerGroup}
                className="text-emerald-400"
              />
              Your workspace
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-2.5 text-emerald-300">
                <FontAwesomeIcon icon={faLayerGroup} />
                Overview
              </div>

              <div className="flex items-center gap-2 px-3 py-2 text-zinc-500">
                <FontAwesomeIcon icon={faBookmark} />
                Saved resources
              </div>

              <div className="flex items-center gap-2 px-3 py-2 text-zinc-500">
                <FontAwesomeIcon icon={faFolderOpen} />
                Collections
              </div>

              <div className="flex items-center gap-2 px-3 py-2 text-zinc-500">
                <FontAwesomeIcon icon={faFileLines} />
                My articles
              </div>
            </div>
          </aside>

          {/* Preview content */}
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] text-zinc-500">
                  YOUR PERSONAL LIBRARY
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                  Your knowledge, organized.
                </h3>
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm text-emerald-300">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-sm text-emerald-400"
                />
                <p className="mt-3 text-xl font-bold text-white">Resources</p>
                <p className="mt-1 text-[10px] text-zinc-500">
                  Your saved discoveries
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className="text-sm text-sky-400"
                />
                <p className="mt-3 text-xl font-bold text-white">Collections</p>
                <p className="mt-1 text-[10px] text-zinc-500">
                  Organized your way
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  Recently saved
                </h4>
                <span className="text-[10px] text-emerald-400">View all</span>
              </div>

              <div className="space-y-2">
                {previewItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] p-2.5"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium text-zinc-200">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] text-zinc-500">
                        {item.category}
                      </p>
                    </div>

                    <FontAwesomeIcon
                      icon={faBookmark}
                      className="text-[10px] text-zinc-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07] bg-white/[0.02] px-4 py-3 text-center text-[10px] text-zinc-500">
          A preview of what your Infodeck workspace could look like.
        </div>
      </div>

      {/* Floating detail */}
      <div className="absolute -right-3 top-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#151816] px-3 py-2.5 shadow-xl sm:flex sm:-right-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">Stay organized</p>
          <p className="mt-1 text-[10px] text-zinc-500">
            Everything in one place
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#070908] font-sans text-white selection:bg-emerald-400/30 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#070908]/85 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <Brand />

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/signin"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Get started
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/[0.07] bg-[#0b0d0c] px-5 py-5 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}

              <div className="my-3 border-t border-white/10" />

              <Link
                to="/signin"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="mt-1 rounded-lg bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-black"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12 lg:pb-32 lg:pt-32">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[750px] -translate-x-1/2 rounded-full bg-emerald-500/[0.09] blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 text-xs font-medium text-emerald-300 sm:text-sm">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                <span>Your personal knowledge space</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="ml-1 text-[10px]"
                />
              </div>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
                Good information
                <br />
                deserves a
                <br />
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  better home.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg lg:mx-0">
                Save what you learn. Organize what you discover. Turn scattered
                links, useful resources, and your best ideas into a knowledge
                library you can actually use.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-400 px-6 py-4 text-sm font-bold text-black shadow-lg shadow-emerald-500/10 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Build your Infodeck
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-6 py-4 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  Explore features
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-xs text-zinc-400"
                  />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-zinc-500 sm:text-sm lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-emerald-400"
                  />
                  Your own library
                </span>
                <span className="inline-flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-emerald-400"
                  />
                  Organized your way
                </span>
              </div>
            </div>

            <DashboardPreview />
          </div>
        </section>

        {/* Value strip */}
        <section className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-7 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 sm:gap-4">
            {[
              {
                icon: faBookmark,
                title: "Save",
                text: "Keep useful information close.",
              },
              {
                icon: faLayerGroup,
                title: "Structure",
                text: "Build a library that makes sense.",
              },
              {
                icon: faGlobe,
                title: "Share",
                text: "Make your discoveries useful to others.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-400">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Everything in one place"
              title="A smarter way to manage what you know."
              description="Infodeck gives your information structure, so your discoveries don't disappear into endless browser tabs and forgotten bookmarks."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/[0.035] sm:p-7"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.background} ${feature.color}`}
                  >
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="text-lg"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-zinc-500 transition group-hover:text-emerald-400">
                    <span>Feature {String(index + 1).padStart(2, "0")}</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[10px] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-24 border-y border-white/[0.07] bg-[#0b0e0c] px-5 py-24 sm:px-8 sm:py-28 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Simple by design"
              title="From scattered information to organized knowledge."
              description="A simple workflow that helps you keep what you find and make better use of what you know."
            />

            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-12 top-6 hidden h-px w-[calc(100%-24px)] bg-gradient-to-r from-emerald-400/30 to-transparent md:block" />
                  )}

                  <p className="text-sm font-bold tracking-[0.2em] text-emerald-400">
                    {step.number}
                  </p>

                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section
          id="about"
          className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28 lg:px-12"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-400">
                <FontAwesomeIcon icon={faShieldHalved} className="text-lg" />
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Your knowledge.
                <br />
                <span className="text-emerald-400">Your decisions.</span>
              </h2>

              <p className="mt-5 text-base leading-8 text-zinc-400">
                Your personal library should work for you. Keep private notes
                for yourself and choose which articles or collections you want
                to make public.
              </p>

              <Link
                to="/signup"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Create your account
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: faLock,
                  title: "Private by default",
                  description:
                    "Personal content should not become public without your decision.",
                },
                {
                  icon: faGlobe,
                  title: "Share intentionally",
                  description:
                    "Choose what you publish and what you keep to yourself.",
                },
                {
                  icon: faShieldHalved,
                  title: "Access that makes sense",
                  description:
                    "Your workspace and its content should respect permissions.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-emerald-400/20 bg-[#0d1510] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-emerald-400/[0.12] blur-[90px]" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-xl text-emerald-400">
                <FontAwesomeIcon icon={faBolt} />
              </div>

              <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Give your ideas a place to grow.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400">
                Start collecting useful information, building your library,
                and making more of what you discover.
              </p>

              <Link
                to="/signup"
                className="group mt-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-400 px-7 py-4 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                Get started with Infodeck
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <p className="mt-4 text-xs text-zinc-500">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <Brand footer />
            <p className="mt-3 text-xs text-zinc-500">
              A better home for what you know.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-500">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <Link to="/signin" className="transition hover:text-white">
              Sign in
            </Link>
            <Link to="/signup" className="transition hover:text-white">
              Sign up
            </Link>
          </div>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Infodeck.
          </p>
        </div>
      </footer>
    </div>
  );
}
