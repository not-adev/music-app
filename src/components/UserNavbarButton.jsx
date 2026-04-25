import { UserButton, useUser } from "@clerk/react";

export default function UserNavbarButton() {
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn && <UserButton />}
    </>
  );
}