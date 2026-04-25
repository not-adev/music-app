import { useClerk } from "@clerk/react";

export default function SignInAndLogin() {
  const { redirectToSignIn } = useClerk();

  const loginWithGoogle = async () => {
    await redirectToSignIn({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
    
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black rounded-3xl">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-scroll-up h-[200%] w-full">
          <img
            src="https://i.pinimg.com/1200x/ed/7b/f7/ed7bf7bb5afa2b7a739513643b79b5e8.jpg"
            alt="background"
            className="h-screen w-full object-cover"
          />
          <img
            src="https://i.pinimg.com/1200x/ed/7b/f7/ed7bf7bb5afa2b7a739513643b79b5e8.jpg"
            alt="background duplicate"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 sm:px-6">
        <button
          onClick={loginWithGoogle}
          className="
            flex flex-col sm:flex-row items-center justify-center gap-4
            w-full max-w-md
            rounded-3xl
            px-6 py-5 sm:px-8 sm:py-6
            bg-white/10 backdrop-blur-xl
            border border-white/15
            hover:bg-white/15
            transition-all duration-300
            shadow-2xl
          "
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
            Continue with Google
          </span>

          <img
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
            src="/logo/google.jpg"
            alt="google"
          />
        </button>
      </div>

      <style>
        {`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          .animate-scroll-up {
            animation: scrollUp 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}