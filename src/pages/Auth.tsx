import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PORTALS } from '@/lib/portals';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().optional(),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const { user, isLoading, signIn, signUp, signInWithGoogle, pendingVerification, verifyEmailCode } = useAuth();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from || '/';
  const fromPortal = PORTALS.find((p) => p.href === redirectTo);
  const [activeTab, setActiveTab] = useState('login');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    try {
      await signUp(values.email, values.password, values.fullName, values.phone);
      // On success, pendingVerification flips to true and the code-entry form renders below.
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.trim().length === 0) return;
    setIsVerifying(true);
    try {
      await verifyEmailCode(verificationCode.trim());
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  // Redirect if already logged in - back to wherever they were headed (a Portal
  // Access card, a protected route), or the homepage otherwise.
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Layout>
      <div className="container max-w-md py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          {/* Login Form */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                {fromPortal && (
                  <div className="flex items-center gap-2 mb-1 text-bba-brown">
                    <fromPortal.icon size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">{fromPortal.title}</span>
                  </div>
                )}
                <CardTitle>{fromPortal ? `Sign in to your ${fromPortal.title}` : 'Login'}</CardTitle>
                <CardDescription>
                  {fromPortal ? fromPortal.description : 'Enter your credentials to access your account'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Google Sign In Button */}
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 21a4 4 0 0 1-4-4V8H2v9a4 4 0 0 0 4 4ZM22 20a5 5 0 0 0-5-5" />
                      <path d="M14 13V4a2 2 0 0 0-2-2c-1.5 0-3 .5-4 2l-2 2.5a10 10 0 0 0-3 7v0c0 1.1.9 2 2 2h5" />
                    </svg>
                  )}
                  Sign in with Google
                </Button>
                
                <div className="flex items-center">
                  <Separator className="flex-1" />
                  <span className="px-3 text-xs text-muted-foreground">or email sign in</span>
                  <Separator className="flex-1" />
                </div>

                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="hello@example.com" 
                              type="email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="••••••••" 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Signup Form */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                {fromPortal && (
                  <div className="flex items-center gap-2 mb-1 text-bba-brown">
                    <fromPortal.icon size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">{fromPortal.title}</span>
                  </div>
                )}
                <CardTitle>{fromPortal ? `Create your ${fromPortal.title} account` : 'Create an account'}</CardTitle>
                <CardDescription>
                  {fromPortal ? fromPortal.description : 'Enter your details to create your account'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {fromPortal && fromPortal.role !== 'student' ? (
                  <div className="text-sm text-muted-foreground bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                    <p>
                      {fromPortal.title} accounts are provisioned by the Beyond Barista Academy team, not created
                      through self-service sign-up.
                    </p>
                    <p>
                      If you already have {fromPortal.title.toLowerCase()} access, switch to the{' '}
                      <button type="button" onClick={() => setActiveTab('login')} className="text-bba-brown font-semibold hover:underline">
                        Login
                      </button>{' '}
                      tab. Otherwise, contact the academy to request access.
                    </p>
                  </div>
                ) : pendingVerification ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      We sent a 6-digit verification code to your email. Enter it below to finish creating your account.
                    </p>
                    <Input
                      placeholder="123456"
                      inputMode="numeric"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleVerifyCode}
                      disabled={isVerifying || verificationCode.trim().length === 0}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </>
                      ) : (
                        'Verify & Continue'
                      )}
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Google Sign In Button */}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 21a4 4 0 0 1-4-4V8H2v9a4 4 0 0 0 4 4ZM22 20a5 5 0 0 0-5-5" />
                          <path d="M14 13V4a2 2 0 0 0-2-2c-1.5 0-3 .5-4 2l-2 2.5a10 10 0 0 0-3 7v0c0 1.1.9 2 2 2h5" />
                        </svg>
                      )}
                      Sign up with Google
                    </Button>

                    <div className="flex items-center">
                      <Separator className="flex-1" />
                      <span className="px-3 text-xs text-muted-foreground">or continue with email</span>
                      <Separator className="flex-1" />
                    </div>

                    <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="hello@example.com" 
                              type="email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+250798123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="••••••••" 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="••••••••" 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Auth;
