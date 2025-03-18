import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return (
    <div>
        <Image src='/R.jpg' width= {900} height={1000} className="object-contain h-full w-full" alt=""/>
        <div className="absolute inset-0 flex items-center justify-center"> 
      <SignIn
        afterSignInUrl="/home" // Redirect to /home after signing in
        afterSignUpUrl="/home" // Redirect to /home after signing up
      />
      </div>
    </div>
  );
}