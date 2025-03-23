"use client"

import { useRouter } from "next/navigation"
import { AuthPage } from "@/components/authPage"

export default function SignUpPage() {
  const router = useRouter()

  async function handleSignUp(formData: FormData) {
    // Get form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Here you would typically call your registration API
    // For example:
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // })

    // For demonstration purposes, we'll just log the data and redirect
    console.log("Sign up attempt with:", { name, email, password })

    // Simulate successful registration
    router.push("/signin")
  }

  return (
    <AuthPage
      title="Create an Account"
      description="Enter your information to create an account"
      buttonText="Sign Up"
      alternativeText="Already have an account?"
      alternativeLink="/signin"
      alternativeLinkText="Sign in"
      showNameField={true}
      onSubmit={handleSignUp}
    />
  )
}

