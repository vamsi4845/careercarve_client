import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <SignIn />
    </div>
  );
}
