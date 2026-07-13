import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import StarfieldCanvas from "@/components/StarfieldCanvas";
import CursorTrail from "@/components/CursorTrail";
import Navbar from "@/components/Navbar";
import JarvisOrb from "@/components/JarvisOrb";
import TerminalFooter from "@/components/TerminalFooter";

import Home from "@/pages/home";
import FounderPage from "@/pages/founder";
import CompanyPage from "@/pages/company";
import TechPage from "@/pages/tech";
import ProjectsPage from "@/pages/projects";
import AchievementsPage from "@/pages/achievements";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/journey" component={FounderPage} />
      <Route path="/company" component={CompanyPage} />
      <Route path="/tech" component={TechPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/achievements" component={AchievementsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          {/* Global elements always visible */}
          <StarfieldCanvas />
          <CursorTrail />
          <Navbar />
          <JarvisOrb />

          {/* Page content */}
          <div
            className="relative pt-16 min-h-screen"
            style={{ zIndex: 1, cursor: "none" }}
          >
            <Router />
            <TerminalFooter />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
