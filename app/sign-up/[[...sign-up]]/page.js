import { SignUp } from "@clerk/nextjs"; // Correct component name

export default function Page() {
  return (
    <div>
      <SignUp
         // Redirect to /home after signing up
      />
    </div>
  );
}