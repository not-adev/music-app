import { div } from "framer-motion/client";
import SignInAndLogin from "../components/SingnUpAndLogin";
export default function SignInAndLoginPage() {
    return (
        <div className="fixed inset-0 z-50">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            {/* Auth Box */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <SignInAndLogin />
            </div>
        </div>
    )
}