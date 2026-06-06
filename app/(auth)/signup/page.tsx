"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Mail, Lock, User, ArrowRight, Loader2, BadgeCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
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
            Join the Next Generation<br/>
            <span className="text-zinc-400">of Procurement</span>
          </h1>
          
          <ul className="space-y-6 mt-12 text-lg text-zinc-400">
            {[
              "Streamlined RFQ to PO workflows",
              "Automated invoice processing",
              "Real-time analytics and tracking",
              "Centralized communication platform"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4">
                <BadgeCheck className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Pane - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-background">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center sm:text-left flex flex-col gap-2">
            <div className="lg:hidden flex items-center justify-center sm:justify-start gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">VendorBridge</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Create account</h2>
            <p className="text-muted-foreground text-sm">
              Enter your details below to create your account and get started.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 mt-8">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-foreground" htmlFor="firstName">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      disabled={isLoading} 
                      className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none text-foreground" htmlFor="lastName">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    disabled={isLoading} 
                    className="h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground" htmlFor="email">
                  Work Email
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
                <label className="text-sm font-medium leading-none text-foreground" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    placeholder="Create a password" 
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
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center sm:text-left text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
