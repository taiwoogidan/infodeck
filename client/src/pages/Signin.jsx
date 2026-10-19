import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight,
  faShieldHalved,
  faLayerGroup,
  faCircleExclamation,
  faArrowLeft,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const formIsValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.length > 0;

  const signinRequest = async (e) => {
    e.preventDefault();

    if (!formIsValid || loading) return;

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to sign in. Please try again.");
        return;
      }

      setMessage(data.message || "Signed in successfully!");

      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      console.error("Signin error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-neutral-600 hover:border-white/20 focus:border-emerald-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-400/10";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070908] px-4 py-10 text-white selection:bg-emerald-400/30 selection:text-white">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-500/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-green-500/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

      <section className="relative w-full max-w-md">
        {/* Back to landing page */}
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-emerald-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to home
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d100e]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Emerald accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />

          <div className="p-6 sm:p-9">
            {/* Brand */}
            <div className="mb-8 text-center">
              <Link
                to="/"
                aria-label="Infodeck home"
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-950/30 transition hover:scale-105 hover:bg-emerald-400/[0.15]"
              >
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="text-2xl"
                />
              </Link>

              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                Your knowledge space
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Welcome <span className="text-emerald-400">back.</span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Sign in to pick up where you left off.
              </p>
            </div>

            {/* Success feedback */}
            {message && (
              <p
                role="status"
                className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-sm text-emerald-300"
              >
                {message}
              </p>
            )}

            {/* Error feedback */}
            {error && (
              <p
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-5 text-red-300"
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mt-0.5"
                />
                <span>{error}</span>
              </p>
            )}

            <form onSubmit={signinRequest} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-neutral-200"
                >
                  Email address
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 transition peer-focus:text-emerald-300"
                  />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-neutral-200"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-neutral-500 transition hover:bg-white/[0.05] hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>

              {/* Remember the visual spacing, not credentials */}
              <button
                type="submit"
                disabled={!formIsValid || loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 text-sm font-bold text-[#071009] shadow-lg shadow-emerald-950/20 transition duration-200 hover:bg-emerald-300 hover:shadow-emerald-400/10 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-500 border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to Infodeck
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                New to Infodeck?
              </span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            <Link
              to="/signup"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.025] py-3.5 text-sm font-semibold text-neutral-200 transition hover:border-emerald-400/30 hover:bg-emerald-400/[0.05] hover:text-emerald-300"
            >
              Create an account
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Security note */}
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-neutral-600">
          <FontAwesomeIcon
            icon={faShieldHalved}
            className="text-emerald-500/70"
          />
          Your account security matters to us.
        </p>

        <p className="mt-3 text-center text-xs text-neutral-700">
          © {new Date().getFullYear()} Infodeck. Your knowledge, organized.
        </p>
      </section>
    </main>
  );
}
