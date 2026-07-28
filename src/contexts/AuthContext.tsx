
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  useAuth as useClerkAuth,
  useUser,
  useSignIn,
  useSignUp,
  useClerk,
} from '@clerk/clerk-react';
import { toast } from '@/components/ui/sonner';
import { api } from '@/lib/api';

export type AppUser = {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    role?: string;
    avatar_url?: string;
    phone?: string | null;
  };
};

type AuthContextType = {
  user: AppUser | null;
  session: { user: AppUser } | null;
  isLoading: boolean;
  pendingVerification: boolean;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<void>;
  verifyEmailCode: (code: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded: isUserLoaded, user: clerkUser } = useUser();
  const { isLoaded: isAuthLoaded, isSignedIn, getToken: clerkGetToken } = useClerkAuth();
  const { signIn, isLoaded: isSignInLoaded, setActive: setActiveFromSignIn } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded, setActive: setActiveFromSignUp } = useSignUp();
  const { signOut: clerkSignOut } = useClerk();

  const [pendingVerification, setPendingVerification] = useState(false);
  // Authoritative role from Neon (via /api/me) - Clerk's own publicMetadata is
  // never set anywhere, so it can't be trusted for role-gating. Defaults to
  // the least-privileged role until resolved.
  const [resolvedRole, setResolvedRole] = useState<string>('student');

  const isLoading = !isUserLoaded || !isAuthLoaded;

  useEffect(() => {
    if (!isSignedIn || !clerkUser) {
      setResolvedRole('student');
      return;
    }
    let cancelled = false;
    clerkGetToken().then((token) => {
      if (!token) return;
      return api.me(token).then((profile) => {
        if (!cancelled) setResolvedRole(profile.role || 'student');
      });
    }).catch(() => {
      // Keep the safe 'student' default if role resolution fails
    });
    return () => {
      cancelled = true;
    };
  }, [isSignedIn, clerkUser?.id]);

  const user: AppUser | null = useMemo(() => {
    if (!isSignedIn || !clerkUser) return null;
    return {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      user_metadata: {
        full_name: clerkUser.fullName || clerkUser.firstName || undefined,
        role: resolvedRole,
        avatar_url: clerkUser.imageUrl,
        phone: clerkUser.primaryPhoneNumber?.phoneNumber || null,
      },
    };
  }, [isSignedIn, clerkUser, resolvedRole]);

  const session = user ? { user } : null;

  const handleSignUp = async (email: string, password: string, fullName: string, phone?: string) => {
    if (!isSignUpLoaded) return;
    try {
      const [firstName, ...rest] = fullName.trim().split(' ');
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName: rest.join(' ') || undefined,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
      toast.success('Check your email for a 6-digit verification code');
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.longMessage || error.message || 'Error during sign up');
      throw error;
    }
  };

  const verifyEmailCode = async (code: string) => {
    if (!isSignUpLoaded) return;
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setActiveFromSignUp({ session: result.createdSessionId });
        setPendingVerification(false);
        toast.success('Account verified! Welcome to Beyond Barista Academy.');
      } else {
        toast.error('Verification incomplete. Please try again.');
      }
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.longMessage || error.message || 'Invalid verification code');
      throw error;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    if (!isSignInLoaded) return;
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        await setActiveFromSignIn({ session: result.createdSessionId });
        toast.success('Signed in successfully!');
      } else {
        toast.error('Sign in incomplete. Please try again.');
      }
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.longMessage || error.message || 'Error during sign in');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!isSignInLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: '/lms',
      });
    } catch (error: any) {
      toast.error(error.message || 'Error signing in with Google');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await clerkSignOut();
      toast.info('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error during sign out');
    }
  };

  const getToken = async () => {
    if (!isSignedIn) return null;
    return clerkGetToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        pendingVerification,
        signUp: handleSignUp,
        verifyEmailCode,
        signIn: handleSignIn,
        signInWithGoogle,
        signOut,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
