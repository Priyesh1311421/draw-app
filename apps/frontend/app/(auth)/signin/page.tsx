"use client"

import { useRouter } from "next/navigation"
import { AuthPage } from "@/components/authPage"
export default function SignInPage() {
  const router = useRouter()

  async function handleSignIn(formData: FormData) {
    // Get form data
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Here you would typically call your authentication API
    // For example:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })

    // For demonstration purposes, we'll just log the data and redirect
    console.log("Sign in attempt with:", { email, password })

    // Simulate successful login
    router.push("/dashboard")
  }

  return (
    <AuthPage
      title="Sign In"
      description="Enter your credentials to access your account"
      buttonText="Sign In"
      alternativeText="Don't have an account?"
      alternativeLink="/signup"
      alternativeLinkText="Sign up"
      onSubmit={handleSignIn}
    />
  )
}

