"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard" // Redirect after mock login
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Pane - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-950 items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>
        
        <div className="relative z-10 p-12 text-zinc-100 max-w-2xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">VendorBridge</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
            Transforming Procurement<br/>
            <span className="text-zinc-400">Through Digital Innovation</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed">
            Centralized vendor management, streamlined RFQs, and automated purchase orders. Designed for enterprise excellence.
          </p>
          
          <div className="flex gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-xs font-medium text-white overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt={`User ${i}`} />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-zinc-400 font-medium">Trusted by 500+ enterprises</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-background">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center sm:text-left flex flex-col gap-2">
            <div className="lg:hidden flex items-center justify-center sm:justify-start gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">VendorBridge</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your procurement dashboard.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 mt-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    placeholder="name@company.com" 
                    type="email" 
                    autoCapitalize="none" 
                    autoComplete="email" 
                    autoCorrect="off" 
                    disabled={isLoading} 
                    className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground" htmlFor="password">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    placeholder="••••••••" 
                    type="password" 
                    disabled={isLoading} 
                    className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/50"
                    required
                  />
                </div>
              </div>
            </div>

            <Button className="w-full h-11 text-base font-medium transition-all" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center sm:text-left text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
