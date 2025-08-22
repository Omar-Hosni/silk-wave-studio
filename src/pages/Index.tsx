import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Spline (non-interactive) */}
      <div className="absolute top-0 left-0 w-full h-full md:h-[93vh] overflow-hidden z-0">
        <iframe
          src="https://my.spline.design/claritystreamcopy-uCYCyHdwftnwvloMeshAjSzW/"
          className="w-full h-full md:h-screen border-0 scale-110 md:scale-100 origin-center pointer-events-none"
          title="3D Background"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Content Overlay - now interactive */}
      <div className="mt-10 absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6">
        <div className="text-center max-w-xs sm:max-w-lg lg:max-w-2xl">
          {/* Logo */}
          <div className="">
            <img
              src="/lovable-uploads/f0284862-5f6e-4c0c-8fda-6eb0e0104ecc.png"
              alt="Symphony Neuro-Tech Logo"
              className="w-36 h-24 sm:w-36 sm:h-24 lg:w-72 lg:h-48 mx-auto object-contain"
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

          {/* Subtitle */}
          <p className="mb-10 text-white/90 font-montserrat italic font-medium text-xs sm:text-sm lg:text-xl leading-relaxed">
            Designed by among the most experienced pioneers of the field
          </p>

          {/* Launching Soon pill */}
          <div className="backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] text-center w-fit mx-auto mb-2">
            <span className="text-primary font-medium text-sm sm:text-base">Launching Soon</span>
          </div>

          <Button
            onClick={() => navigate('/contact')}
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
