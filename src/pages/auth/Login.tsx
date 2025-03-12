
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-plant-50/80 to-white dark:from-plant-950/20 dark:to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-plant-100 dark:bg-plant-900/30 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-plant-600 dark:text-plant-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-plant-500 hover:bg-plant-600">Sign In</Button>
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-plant-600 hover:text-plant-700 dark:text-plant-400 dark:hover:text-plant-300">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
