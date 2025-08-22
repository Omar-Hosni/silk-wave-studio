import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Spline (non-interactive) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://my.spline.design/claritystreamcopy-uCYCyHdwftnwvloMeshAjSzW/"
          className="w-full h-full border-0 scale-110 md:scale-100 origin-center pointer-events-none"
          title="3D Background"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Content Overlay (interactive) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
        <div className="pointer-events-auto text-center max-w-xs sm:max-w-lg lg:max-w-3xl">
          {/* Logo — reduced spacing */}
          <div className="mb-2 sm:mb-3">
            <img
              src="/lovable-uploads/f0284862-5f6e-4c0c-8fda-6eb0e0104ecc.png"
              alt="Symphony Neuro-Tech Logo"
              className="w-32 h-32 sm:w-36 sm:h-36 lg:w-64 lg:h-64 mx-auto object-contain"
            />
          </div>

          {/* Main Description — EXACTLY two lines */}
          <p className="mb-3 text-white font-montserrat font-medium text-sm sm:text-base lg:text-xl leading-snug mx-auto">
            <span className="whitespace-nowrap">
              AI-powered, clinic-ready focused ultrasound neuromodulation systems
            </span>
            <br />
            <span className="whitespace-nowrap">
              and treatment protocol discovery.
            </span>
          </p>

          {/* Subtitle — tighter gap */}
          <p className="mb-4 text-white/90 font-montserrat italic font-medium text-xs sm:text-sm lg:text-xl leading-relaxed">
            Designed by among the most experienced pioneers of the field
          </p>

          {/* Launching Soon pill (same width feel as button via padding & min height) */}
          <div className="mx-auto mb-2 w-fit rounded-full border border-primary/20 backdrop-blur-sm px-6 py-3 sm:px-8 sm:py-4 min-h-[44px]">
            <span className="text-primary font-medium text-sm sm:text-base">
              Launching Soon
            </span>
          </div>

          {/* Contact button */}
          <Button
            onClick={() => navigate("/contact")}
            variant="outline"
            size="lg"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 min-h-[44px]"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
