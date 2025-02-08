"use client"

import AuthForm from '@/components/auth-form'
import { signinWithCredentials } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/validation'


const Signin = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signinWithCredentials}
    />
  )
}

export default Signin