"use client"

import AuthForm from "@/components/auth-form";
import { SignUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";

const Signup = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={SignUp}
    />
  );
};

export default Signup;
