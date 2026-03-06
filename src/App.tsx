import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import PrivateJournal from "./pages/PrivateJournal";
import ShareCardEditor from "./pages/ShareCardEditor";
import CoupleRoom from "./pages/CoupleRoom";
import GuidedConversation from "./pages/GuidedConversation";
import ModulesLibrary from "./pages/ModulesLibrary";
import WeeklyCheckIn from "./pages/WeeklyCheckIn";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journal" element={<PrivateJournal />} />
          <Route path="/share-card" element={<ShareCardEditor />} />
          <Route path="/couple-room" element={<CoupleRoom />} />
          <Route path="/guided-conversation" element={<GuidedConversation />} />
          <Route path="/modules" element={<ModulesLibrary />} />
          <Route path="/check-in" element={<WeeklyCheckIn />} />
          <Route path="/safety" element={<SafetyCentre />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
