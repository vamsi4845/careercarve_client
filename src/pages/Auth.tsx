import { SignIn } from "@clerk/clerk-react";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[url('/auth.png')] bg-cover bg-no-repeat items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="text-center md:text-left md:w-1/2 mb-8 flex flex-col items-center justify-center md:mb-0">
          <img
            src="/logo_welcome.png"
            alt="Welcome Logo"
            className="w-32 h-32 mx-auto md:mx-0 mb-4"
          />
          <img
            src="/logo_title.png"
            alt="CareerCarve"
            className="max-w-full h-auto mx-auto md:mx-0 mb-4"
          />
          <p className="text-xl font-semibold">
            Placement | Preparedness | Perfected
          </p>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
}