import { Card } from "@/components/ui/card";
import { SignUpForm } from "./components/sign-up-form";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../layout";

export default function SignUp() {
  return (
    <AuthLayout>
      <Card className="p-6 max-w-md mx-auto">
        <div className="mb-2 flex flex-col space-y-2 text-left">
          <h1 className="text-lg font-semibold tracking-tight">Create an account</h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpForm />
        </Suspense>

        <div className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>

        {/* <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p> */}
      </Card>
    </AuthLayout>
  );
}
