import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowRight,
  faRotate,
  faShieldHalved,
  faLayerGroup,
  faCircleExclamation,
  faArrowLeft,
  faWandMagicSparkles,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email") || "";
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const normalizedEmail = newEmail.trim().toLowerCase();

    if (!email) {
      setError("Your current email was not found. Please sign up again.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (normalizedEmail === email.trim().toLowerCase()) {
      setError("Your new email must be different from your current email.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/auth/change-email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            newEmail: normalizedEmail,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to change your email.");
        return;
      }

      // Support either a string or an object returned as data.user.
      const updatedEmail =
        typeof data.user === "string"
          ? data.user
          : data.user?.email || normalizedEmail;

      localStorage.setItem("email", updatedEmail);

      setNewEmail("");
      setMessage(data.message || "Email changed successfully.");

      // Redirect after briefly displaying the success message.
      setTimeout(() => {
        navigate("/verify", { replace: true });
      }, 1500);
    } catch (err) {
      console.error("Change email error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-600 hover:border-white/20 focus:border-emerald-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070908] px-4 py-10 text-white selection:bg-emerald-400/30 selection:text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-500/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-green-500/[0.07] blur-[140px]" />

      <section className="relative w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-emerald-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to home
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d100e]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Emerald accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />

          <div className="p-6 sm:p-9">
            {/* Brand */}
            <Link
              to="/"
              className="mb-8 flex w-fit items-center gap-3"
              aria-label="Infodeck home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <FontAwesomeIcon icon={faLayerGroup} className="text-lg" />
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Info<span className="text-emerald-400">Deck</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] text-xl text-emerald-300">
                <FontAwesomeIcon icon={message ? faCheck : faEnvelope} />
              </div>

              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                Account settings
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight">
                Change your <span className="text-emerald-400">email.</span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Update your email address and we'll help you verify the new one
                so you can continue using Infodeck.
              </p>
            </div>

            {/* Success message */}
            {message && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4 text-sm text-emerald-300"
              >
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheck} className="mt-0.5" />
                  <div>
                    <p className="font-semibold">{message}</p>
                    <p className="mt-1 text-xs text-emerald-300/70">
                      Redirecting you to email verification...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4 text-sm leading-5 text-red-300"
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mt-0.5"
                />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRequest} className="space-y-5">
              {/* Current email */}
              <div>
                <label
                  htmlFor="currentEmail"
                  className="mb-2 block text-sm font-semibold text-neutral-200"
                >
                  Current email
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600"
                  />

                  <input
                    id="currentEmail"
                    type="email"
                    value={email}
                    disabled
                    className={`${inputClass} border-white/[0.06] bg-white/[0.02] text-neutral-500`}
                  />
                </div>
              </div>

              {/* New email */}
              <div>
                <label
                  htmlFor="newEmail"
                  className="mb-2 block text-sm font-semibold text-neutral-200"
                >
                  New email address
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    id="newEmail"
                    name="newEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setError("");
                      setMessage("");
                    }}
                    autoComplete="email"
                    required
                    disabled={loading || Boolean(message)}
                    className={inputClass}
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-neutral-600">
                  Make sure you can access this inbox to receive your
                  verification code.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  loading || Boolean(message) || !newEmail.trim() || !email
                }
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-bold text-[#071009] shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faRotate} className="animate-spin" />
                    Changing email...
                  </>
                ) : (
                  <>
                    Update email address
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Back to verification */}
            <div className="mt-7 border-t border-white/[0.08] pt-5 text-center">
              <p className="text-sm text-neutral-500">Remember your email?</p>

              <Link
                to="/verify"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Back to verification
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
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
