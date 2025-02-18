import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { ToastAction } from "@radix-ui/react-toast"

export default function SignupForm({
  className,
  ...props
}) {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")

  const {toast} = useToast()
  const navigate = useNavigate()

  const submitForm = async(e)=>{
    e.preventDefault()
    if(!username || !password){
      return
    }
    try {
          const response = await axios.post('/api/signup',{username,password,firstname,lastname})
          if(response.data.error){
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: response.data.error,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return
          }
          navigate('/login')
    } catch (error) {        
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e)=>submitForm(e)}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create Account</h1>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="s-email">Email</Label>
                <Input onChange={(e)=>setUsername(e.target.value)} id="s-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="s-firstname">First Name</Label>
                <Input onChange={(e)=>setFirstname(e.target.value)} id="s-firstname"  placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="s-lastname">LastName</Label>
                <Input onChange={(e)=>setLastname(e.target.value)} id="s-lastname"  placeholder="Doe" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="s-password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input onChange={(e)=>setPassword(e.target.value)} id="s-password" type="password" placeholder="Passsword" required />
              </div>
              <Button type="submit" className="w-full  bg-darkorange hover:bg-coral-600">
                Sign Up
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/MountainMan.png"
              alt="Image"
              className="absolute inset-0 h-52 w-44 object-cover dark:brightness-[0.2] dark:grayscale" />
            <img
              src="/illustration.png"
              alt="Image"
              className="absolute inset-0 h-44 w-48 object-cover dark:brightness-[0.2] dark:grayscale self-center justify-self-end " />
            <img
              src="/raining_money.png"
              alt="Image"
              className="absolute inset-0 h-52 w-52 object-cover dark:brightness-[0.2] dark:grayscale self-end" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>)
  );
}
