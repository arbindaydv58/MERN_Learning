import { NavLink } from "react-router";
import AuthLayout from "../layouts/AuthLayout";


const RegisterPage = () => {
  return (
    <AuthLayout
      badge="Join today. Shop faster. Save more."
      title="Create your SWIFICART account."
      description="Set up your profile to save delivery details, build wishlists, track orders, and unlock a smoother checkout experience."
      mobileSubtitle="Create your account"
      footer={
        <p className="relative max-w-md text-sm leading-6 text-white/60">
          Your account keeps shopping simple across every visit, from product
          discovery to secure checkout.
        </p>
      }
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c47d13]">
          New account
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#12332f]">
          Register with SWIFICART
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Fill in your details to start shopping with a personalized account.
        </p>
      </div>

      {/* <form className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Full name
          </span>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1e7a6d] focus:ring-4 focus:ring-[#1e7a6d]/15"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Email address
          </span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1e7a6d] focus:ring-4 focus:ring-[#1e7a6d]/15"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Password
          </span>
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1e7a6d] focus:ring-4 focus:ring-[#1e7a6d]/15"
          />
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-[#12332f] px-5 text-sm font-bold text-white shadow-lg shadow-[#12332f]/20 transition hover:bg-[#1e7a6d] focus:outline-none focus:ring-4 focus:ring-[#1e7a6d]/20"
        >
          Create account
        </button>
      </form> */}

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <NavLink
          to="/"
          className="font-bold text-[#1e7a6d] transition hover:text-[#12332f]"
        >
          Login
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;