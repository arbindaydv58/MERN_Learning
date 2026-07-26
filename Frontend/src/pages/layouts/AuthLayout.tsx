import Logo from "../../assets/images/logo.png";

type AuthLayoutProps = {
  badge: string;
  title: string;
  description: string;
  mobileSubtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const AuthLayout = ({
  badge,
  title,
  description,
  mobileSubtitle,
  children,
  footer,
}: AuthLayoutProps) => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden overflow-hidden bg-[#12332f] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#f0b44c]/25 blur-3xl" />
          <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#47b6a7]/20 blur-3xl" />

          <div className="relative flex items-center gap-4">
            <img
              src={Logo}
              alt="SWIFICART logo"
              className="h-16 w-16 rounded-lg bg-white object-cover p-1 shadow-xl shadow-black/20"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f0b44c]">
                SWIFICART
              </p>
              <p className="text-sm text-white/70">Premium shopping portal</p>
            </div>
          </div>

          <div className="relative max-w-xl">
            <p className="mb-5 inline-flex rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 backdrop-blur">
              {badge}
            </p>
            <h1 className="text-5xl font-bold leading-tight">{title}</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/72">
              {description}
            </p>
          </div>

          {footer}
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <img
                src={Logo}
                alt="SWIFICART logo"
                className="h-14 w-14 rounded-lg bg-white object-cover p-1 shadow-lg"
              />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#12332f]">
                  SWIFICART
                </p>
                <p className="text-sm text-slate-500">{mobileSubtitle}</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/80 bg-white/85 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-8">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;