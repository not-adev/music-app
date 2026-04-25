import { useUser } from "@clerk/react";
import { useEffect } from "react";
import axios from "axios";

export default function AuthSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const syncUser = async () => {
      try {
        await axios.post(`${backendUrl}/syncUser`, {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          userName: user.fullName,
        });
      } catch (err) {
        console.error(err);
      }
    };

    syncUser();
  }, [isLoaded, user]);

  return null;
}