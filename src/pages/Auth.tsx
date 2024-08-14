import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-[url('/auth.png')] bg-cover bg-no-repeat">
      <SignIn />
    </div>
  );
}
