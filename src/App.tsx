import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import DashboardA from "./pages/DashboardA";
import DashboardB from "./pages/DashboardB";
import CoupleRoom from "./pages/CoupleRoom";
import ModulesLibrary from "./pages/ModulesLibrary";
import SafetyCentre from "./pages/SafetyCentre";
import Membership from "./pages/Membership";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard-a" element={<DashboardA />} />
            <Route path="/dashboard-b" element={<DashboardB />} />
            <Route path="/couple-room" element={<CoupleRoom />} />
            <Route path="/modules" element={<ModulesLibrary />} />
            <Route path="/safety" element={<SafetyCentre />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
