import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState } from "react";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

// Pages - Marketing Site
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Trainings from "./pages/Trainings";
import Trainers from "./pages/Trainers";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CulinaryArts from './pages/CulinaryArts';
import ArtificialBeauty from './pages/ArtificialBeauty';
import Consultancy from './pages/Consultancy';
import OutsideCatering from './pages/OutsideCatering';

// Pages - Ecosystem Pages
import Membership from './pages/Membership';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Events from './pages/Events';
import JobBoard from './pages/JobBoard';

// Pages - LMS Enterprise 5-Role RBAC System
import SuperAdminDashboard from './pages/lms/SuperAdminDashboard';
import AdminDashboard from './pages/lms/AdminDashboard';
import InstructorDashboard from './pages/lms/InstructorDashboard';
import LMSDashboard from './pages/lms/LMSDashboard';
import GuestPortal from './pages/lms/GuestPortal';
import CourseCatalog from './pages/lms/CourseCatalog';
import CoursePlayer from './pages/lms/CoursePlayer';
import CourseEditor from './pages/lms/CourseEditor';
import CertificateVerification from './pages/lms/CertificateVerification';
import QuizPage from './pages/lms/QuizPage';
import Leaderboard from './pages/lms/Leaderboard';

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* ===== Marketing Site ===== */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/career" element={<Career />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/trainings" element={<Trainings />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
                <Route path="/culinary-arts" element={<CulinaryArts />} />
                <Route path="/artificial-beauty" element={<ArtificialBeauty />} />
                <Route path="/consultancy" element={<Consultancy />} />
                <Route path="/outside-catering" element={<OutsideCatering />} />

                {/* ===== Ecosystem Pages ===== */}
                <Route path="/membership" element={<Membership />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/events" element={<Events />} />
                <Route path="/jobs" element={<JobBoard />} />

                {/* ===== LMS 5-Role RBAC System Routes ===== */}
                <Route path="/lms" element={<LMSDashboard />} />
                <Route path="/lms/super-admin" element={<SuperAdminDashboard />} />
                <Route path="/lms/admin" element={<AdminDashboard />} />
                <Route path="/lms/instructor" element={<InstructorDashboard />} />
                <Route path="/lms/student" element={<LMSDashboard />} />
                <Route path="/lms/guest" element={<GuestPortal />} />

                {/* ===== LMS Learning & Catalog Routes ===== */}
                <Route path="/lms/courses" element={<CourseCatalog />} />
                <Route path="/lms/courses/:courseId/learn" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
                <Route path="/lms/courses/:courseId/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                <Route path="/lms/instructor/courses/new" element={<ProtectedRoute><CourseEditor /></ProtectedRoute>} />
                <Route path="/lms/instructor/courses/:id/edit" element={<ProtectedRoute><CourseEditor /></ProtectedRoute>} />
                <Route path="/lms/leaderboard" element={<Leaderboard />} />

                {/* ===== Public Certificate Verification ===== */}
                <Route path="/certificate/:id" element={<CertificateVerification />} />

                {/* ===== 404 ===== */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
