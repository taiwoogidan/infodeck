import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faCheck,
  faArrowRight,
  faLayerGroup,
  faArrowLeft,
  faShieldHalved,
  faCircleExclamation,
  faCircleCheck,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9\s]/.test(password),
    },
  ];

  const passwordIsValid =
    passwordRules.every((rule) => rule.valid) && !/\s/.test(password);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const formIsValid =
    fname.trim().length > 0 &&
    lname.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    passwordIsValid &&
    passwordsMatch;

  const signupRequest = async (e) => {
    e.preventDefault();

    if (!formIsValid || loading) return;

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fname: fname.trim(),
            lname: lname.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create your account.");
        return;
      }

      const signupEmail =
        typeof data.user === "string"
          ? data.user
          : data.user?.email || email.trim().toLowerCase();

      localStorage.setItem("email", signupEmail);
      setMessage(data.message || "Account created successfully!");

      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/signin", {
        state: { email: signupEmail },
      });
    } catch (err) {
      console.error("Signup error:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.09] bg-[#090b0a] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-200 placeholder:text-zinc-600 hover:border-white/[0.15] focus:border-emerald-400/60 focus:bg-[#0a0d0b] focus:ring-4 focus:ring-emerald-400/[0.08]";

  const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070908] px-4 py-8 text-white selection:bg-emerald-400/30 sm:px-6 sm:py-12">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.09] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-teal-500/[0.06] blur-[130px]" />

      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <section className="relative w-full max-w-[480px]">
        {/* Back to landing page */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-emerald-400"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to home
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0e0d]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300" />

          <div className="p-6 sm:p-9">
            {/* Brand */}
            <div className="mb-8">
              <Link
                to="/"
                aria-label="Infodeck home"
                className="mb-8 inline-flex items-center gap-3"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-xl text-emerald-400 shadow-lg shadow-emerald-500/[0.06]">
                  <FontAwesomeIcon icon={faLayerGroup} />
                </span>

                <span className="text-2xl font-bold tracking-tight text-white">
                  Info
                  <span className="text-emerald-400">deck</span>
                </span>
              </Link>

              <div className="mt-5">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-300">
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                  Your knowledge starts here
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-[34px]">
                  Create your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Build your personal library. Keep your discoveries organized
                  and your ideas within reach.
                </p>
              </div>
            </div>

            {/* Success message */}
            {message && (
              <div
                role="status"
                className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 text-sm text-emerald-300"
              >
                <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
                <span>{message}</span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
              >
                <FontAwesomeIcon icon={faCircleExclamation} className="mt-1" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={signupRequest} className="space-y-5">
              {/* Names */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fname" className={labelClass}>
                    First name
                  </label>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
                    />

                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lname" className={labelClass}>
                    Last name
                  </label>

                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
                    />

                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      autoComplete="family-name"
                      placeholder="Last name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
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
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-12`}
                    aria-describedby="password-rules"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-500 transition hover:bg-white/[0.05] hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>

                {/* Password checklist */}
                <div
                  id="password-rules"
                  className="mt-3 rounded-xl border border-white/[0.06] bg-black/20 p-4"
                >
                  <p className="mb-3 text-xs font-semibold text-zinc-400">
                    Your password must contain
                  </p>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {passwordRules.map((rule) => (
                      <div
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                          rule.valid ? "text-emerald-400" : "text-zinc-500"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            rule.valid ? "bg-emerald-400/15" : "bg-white/[0.05]"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-[9px]"
                          />
                        </span>

                        {rule.label}
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 border-t border-white/[0.06] pt-3 text-xs text-zinc-600">
                    Spaces are not allowed in the password.
                  </p>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm password
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${inputClass} pr-12 ${
                      confirmPassword && !passwordsMatch
                        ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/10"
                        : confirmPassword && passwordsMatch
                          ? "border-emerald-400/40"
                          : ""
                    }`}
                    aria-invalid={confirmPassword.length > 0 && !passwordsMatch}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-zinc-500 transition hover:bg-white/[0.05] hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>

                {confirmPassword && (
                  <p
                    className={`mt-2 flex items-center gap-2 text-xs ${
                      passwordsMatch ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        passwordsMatch ? faCircleCheck : faCircleExclamation
                      }
                    />
                    {passwordsMatch
                      ? "Passwords match."
                      : "Passwords do not match."}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!formIsValid || loading}
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-400 py-4 text-sm font-bold text-[#06100a] shadow-lg shadow-emerald-500/[0.08] transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create account
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
                Already a member?
              </span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            <p className="text-center text-sm text-zinc-400">
              Have an account?{" "}
              <Link
                to="/signin"
                className="font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Trust footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
          <FontAwesomeIcon
            icon={faShieldHalved}
            className="text-emerald-500/70"
          />
          <span>Your knowledge, organized. Your account, protected.</span>
        </div>

        <p className="mt-3 text-center text-[11px] text-zinc-700">
          © {new Date().getFullYear()} Infodeck. All rights reserved.
        </p>
      </section>
    </main>
  );
}
