import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Spline (non-interactive, behind everything) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <iframe
          src="https://my.spline.design/claritystreamcopy-uCYCyHdwftnwvloMeshAjSzW/"
          className="w-full h-full border-0 scale-110 md:scale-100 origin-center pointer-events-none"
          title="3D Background"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Content Overlay (interactive) */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 cursor-auto"
        style={{ cursor: "auto" }} // <- hard override in case of global cursor:none
      >
        <div className="text-center max-w-xs sm:max-w-lg lg:max-w-2xl">
          {/* Logo */}
          <div className="mb-2 sm:mb-3">
            <img
              src="/lovable-uploads/f0284862-5f6e-4c0c-8fda-6eb0e0104ecc.png"
              alt="Symphony Neuro-Tech Logo"
              className="w-36 h-24 sm:w-36 sm:h-24 lg:w-72 lg:h-48 mx-auto object-contain"
            />
          </div>

          {/* Main Description — EXACTLY two lines */}
          <p className="mb-3 text-white font-montserrat font-medium text-sm sm:text-base lg:text-xl leading-snug mx-auto cursor-auto">
            <span className="whitespace-nowrap">
              AI-powered, clinic-ready focused ultrasound neuromodulation systems
            </span>
            <br />
            <span className="whitespace-nowrap">
              and treatment protocol discovery.
            </span>
          </p>

          {/* Subtitle */}
          <p className="mb-6 text-white/90 font-montserrat italic font-medium text-xs sm:text-sm lg:text-xl leading-relaxed cursor-auto">
            Designed by among the most experienced pioneers of the field
          </p>

          {/* Launching Soon pill */}
          <div className="mx-auto mb-2 w-fit rounded-full border border-primary/20 backdrop-blur-sm px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] text-center cursor-auto">
            <span className="text-primary font-medium text-sm sm:text-base">
              Launching Soon
            </span>
          </div>

          {/* Contact button */}
          <Button
            onClick={() => navigate("/contact")}
            variant="outline"
            size="lg"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] cursor-auto"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
