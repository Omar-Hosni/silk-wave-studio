import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden overflow-y-hidden bg-black">
      <CustomCursor />

      {/* Background Spline */}
      <div className="pointer-events-none fixed inset-0">
        <iframe
          src="https://my.spline.design/claritystreamcopy-uCYCyHdwftnwvloMeshAjSzW/"
          title="3D Background"
          className="
            block w-[100vw] h-[90vh] border-0
          "
        />
        {/* Fade to ensure wave edge never competes with content */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Overlay */}
      <div
        className="
          absolute left-1/2 top-[12vh] sm:top-1/2
          -translate-x-1/2 sm:-translate-y-1/2
          z-10 w-full px-5 sm:px-6
        "
      >
        <div className="pointer-events-auto mx-auto max-w-[56rem] text-center space-y-4 sm:space-y-6">
          {/* Logo */}
          <img
            src="/lovable-uploads/f0284862-5f6e-4c0c-8fda-6eb0e0104ecc.png"
            alt="Symphony Neuro-Tech Logo"
            className="mx-auto w-36 h-24 sm:w-40 sm:h-28 lg:w-72 lg:h-48 object-contain"
          />

          {/* Headline: wraps on mobile, stays tidy on larger screens */}
          <p className="text-white font-montserrat font-medium text-base sm:text-lg lg:text-2xl leading-relaxed sm:leading-snug text-pretty">
            <span className="sm:whitespace-nowrap">
              AI-powered, clinic-ready focused ultrasound neuromodulation systems
            </span>
            <br className="hidden sm:block" />
            <span className="sm:whitespace-nowrap">
              and treatment protocol discovery.
            </span>
          </p>

          {/* Subtitle */}
          <p className="text-white/90 font-montserrat italic font-medium text-sm sm:text-base lg:text-xl leading-relaxed text-pretty">
            Designed by among the most experienced pioneers of the field
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 pt-2">
            <div className="backdrop-blur-sm border border-primary/20 rounded-full px-5 py-2.5 sm:px-8 sm:py-3.5 min-h-[44px]">
              <span className="text-primary font-medium text-sm sm:text-base">
                Launching Soon
              </span>
            </div>

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
    </div>
  );
};

export default Index;
