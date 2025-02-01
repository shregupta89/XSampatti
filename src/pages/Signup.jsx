import SignupForm from '@/components/signup-form'
import React from 'react'

const Signup = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-10 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm/>
      </div>
    </div>
  )
}

export default Signup