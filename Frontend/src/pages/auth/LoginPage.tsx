import { NavLink } from "react-router";
import AuthLayout from "../layouts/AuthLayout";


const LoginPage = () => {
  return (
    <AuthLayout
      badge="Fast checkout. Secure orders. Better deals."
      title="Welcome back to smarter shopping."
      description="Access your account to track orders, save wishlists, manage delivery details, and discover fresh offers curated for you."
      mobileSubtitle="Login to continue"
      footer={
        <div className="relative grid grid-cols-3 gap-4">
          {[
            ["24/7", "Support"],
            ["100%", "Secure"],
            ["50k+", "Products"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur"
            >
              <p className="text-2xl font-bold text-[#f0b44c]">{value}</p>
              <p className="mt-1 text-sm text-white/70">{label}</p>
            </div>
          ))}
        </div>
      }
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c47d13]">
          Account access
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#12332f]">
          Login to your account
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your details below to continue shopping with SWIFICART.
        </p>
      </div>

      {/* <form className="space-y-5">
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
            placeholder="Enter your password"
            className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1e7a6d] focus:ring-4 focus:ring-[#1e7a6d]/15"
          />
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-[#12332f] px-5 text-sm font-bold text-white shadow-lg shadow-[#12332f]/20 transition hover:bg-[#1e7a6d] focus:outline-none focus:ring-4 focus:ring-[#1e7a6d]/20"
        >
          Login
        </button>
      </form> */}

      <p className="mt-8 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <NavLink
          to="/register"
          className="font-bold text-[#1e7a6d] transition hover:text-[#12332f]"
        >
          Sign up
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;