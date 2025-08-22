import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Spline (no pointer events) */}
      <div className="absolute top-0 left-0 w-full h-full md:h-[93vh] overflow-hidden z-0">
        <iframe
          src="https://my.spline.design/claritystreamcopy-uCYCyHdwftnwvloMeshAjSzW/"
          className="w-full h-full md:h-screen border-0 scale-110 md:scale-100 origin-center pointer-events-none"
          title="3D Background"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6">
        <div className="text-center pointer-events-auto max-w-xs sm:max-w-lg lg:max-w-2xl">
          {/* Logo with tighter gap */}
          <div className="mb-2 sm:mb-3">
            <img
              src="/lovable-uploads/f0284862-5f6e-4c0c-8fda-6eb0e0104ecc.png"
              alt="Symphony Neuro-Tech Logo"
              className="w-36 h-36 sm:w-36 sm:h-36 lg:w-72 lg:h-72 mx-auto object-contain"
            />
          </div>

          {/* Main Description — exactly two lines via a deliberate break */}
          <p className="mb-3 text-white font-montserrat font-medium text-sm sm:text-base lg:text-xl leading-snug mx-auto">
            AI-powered, clinic-ready focused ultrasound neuromodulation systems
            <br className="block" />
            and treatment protocol discovery.
          </p>

          {/* Subtitle with reduced gap */}
          <p className="mb-4 text-white/90 font-montserrat italic font-medium text-xs sm:text-sm lg:text-xl leading-relaxed">
            Designed by among the most experienced pioneers of the field
          </p>

          {/* Launching Soon pill */}
          <div className="mx-auto mb-2 w-fit rounded-full border border-primary/20 backdrop-blur-sm px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] text-center">
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
