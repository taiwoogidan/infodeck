import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faShieldHalved,
  faArrowRight,
  faCheck,
  faRotate,
  faLayerGroup,
  faCircleExclamation,
  faArrowLeft,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function VerifyEmail() {
  const email = localStorage.getItem("email");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the complete 6-digit verification code.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed. Please try again.");
        return;
      }

      setMessage(data.message || "Your email has been verified!");
      setVerified(true);
      localStorage.removeItem("email");
      setOtp("");
    } catch (err) {
      console.error("Email verification error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              className="mx-auto mb-7 flex w-fit items-center gap-3"
              aria-label="Infodeck home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="text-lg"
                />
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Info<span className="text-emerald-400">Deck</span>
              </span>
            </Link>

            {/* Heading */}
            <div className="mb-7 text-center">
              <div
                className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl transition ${
                  verified
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                }`}
              >
                <FontAwesomeIcon
                  icon={verified ? faCheck : faEnvelope}
                />
              </div>

              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                Account security
              </p>

              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {verified ? (
                  <>
                    Email <span className="text-emerald-400">verified!</span>
                  </>
                ) : (
                  <>
                    Verify your <span className="text-emerald-400">email.</span>
                  </>
                )}
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-400">
                {verified
                  ? "Your email address has been verified successfully. You're ready to sign in to your account."
                  : "We've sent a 6-digit verification code to your email address. Enter the code below to continue."}
              </p>

              {!verified && email && (
                <p className="mt-3 break-all text-sm font-semibold text-emerald-300">
                  {email}
                </p>
              )}
            </div>

            {/* Success feedback */}
            {message && (
              <div
                role="status"
                className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4 text-sm leading-5 text-emerald-300"
              >
                <FontAwesomeIcon icon={faCheck} className="mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            {/* Error feedback */}
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

            {verified ? (
              <Link
                to="/signin"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-bold text-[#071009] shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20"
              >
                Continue to sign in
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : (
              <>
                <form onSubmit={handleVerification}>
                  <label
                    htmlFor="otp"
                    className="mb-3 block text-sm font-semibold text-neutral-200"
                  >
                    Verification code
                  </label>

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="000000"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={otp}
                    onChange={(e) => {
                      setOtp(
                        e.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setError("");
                    }}
                    disabled={loading || !email}
                    required
                    aria-describedby="otp-help"
                    className="mb-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center text-2xl font-bold tracking-[0.6em] text-white outline-none transition placeholder:text-neutral-700 focus:border-emerald-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <p
                    id="otp-help"
                    className="mb-5 text-xs leading-5 text-neutral-500"
                  >
                    Enter the 6-digit code sent to your email. Check your
                    spam folder if you can't find it.
                  </p>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6 || !email}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-bold text-[#071009] shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400 disabled:shadow-none"
                  >
                    <FontAwesomeIcon
                      icon={loading ? faRotate : faCheck}
                      className={loading ? "animate-spin" : ""}
                    />
                    {loading ? "Verifying..." : "Verify email"}
                    {!loading && (
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>

                <div className="mt-7 border-t border-white/[0.08] pt-5 text-center">
                  <p className="text-sm text-neutral-500">
                    Used the wrong email?
                  </p>

                  <Link
                    to="/change-email"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                  >
                    Change email address
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xs"
                    />
                  </Link>
                </div>
              </>
            )}
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
