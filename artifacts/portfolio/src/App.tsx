import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import StarfieldCanvas from "@/components/StarfieldCanvas";
import CursorTrail from "@/components/CursorTrail";
import Navbar from "@/components/Navbar";
import JarvisOrb from "@/components/JarvisOrb";
import TerminalFooter from "@/components/TerminalFooter";

import Home from "@/pages/home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global elements always visible */}
        <StarfieldCanvas />
        <CursorTrail />
        <Navbar />
        <JarvisOrb />

        {/* Single-page portfolio content */}
        <div
          className="relative pt-16 min-h-screen"
          style={{ zIndex: 1, cursor: "none" }}
        >
          <Home />
          <TerminalFooter />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
