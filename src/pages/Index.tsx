import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden overflow-y-hidden bg-black">
      <CustomCursor />

      {/* Background Video */}
      <div className="pointer-events-none fixed inset-0">
        <video
          src="background_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="block w-[100vw] h-[100vh] object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div
        className="
          absolute left-1/2 top-[12vh] sm:top-1/2
          -translate-x-1/2 sm:-translate-y-1/2
          z-10 w-full px-5 sm:px-6
        "
      >
        <div className="pointer-events-auto mx-auto max-w-[56rem] text-center space-y-2 sm:space-y-3">
          {/* Logo */}
          <img
            src="/lovable-uploads/logo.png"
            alt="Symphony Neuro-Tech Logo"
            className="mx-auto w-36 h-24 sm:w-40 sm:h-28 lg:w-72 lg:h-48 object-contain"
          />

          {/* Headline */}
          <p className="text-black font-montserrat font-medium text-[15px] sm:text-lg lg:text-2xl leading-snug text-pretty">
            <span className="block">
              AI-powered, clinic-ready focused ultrasound neuromodulation systems
            </span>
            <span className="block">
              and treatment protocol discovery.
            </span>
          </p>

          {/* Subtitle */}
          <p className="text-black font-montserrat italic font-medium text-sm sm:text-base lg:text-xl leading-relaxed text-pretty">
            Designed by among the most experienced pioneers of the field
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 pt-2">
            <div className="backdrop-blur-sm border border-black rounded-full px-5 py-2.5 sm:px-8 sm:py-3.5 min-h-[44px]">
              <span className="text-cyan-600 font-medium text-sm sm:text-base">
                Launching Soon
              </span>
            </div>

            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              size="lg"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:text-gray-400 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 min-h-[44px]"
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
