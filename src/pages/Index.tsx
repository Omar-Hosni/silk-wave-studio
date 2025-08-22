import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

    {/* Responsive Spline iframe */}
    <div className="absolute top-0 left-0 w-full h-full md:h-[93vh] overflow-hidden">
      <iframe
        src="https://my.spline.design/claritystreamcopy-uCYCyHdwftnwvloMeshAjSzW/"
        className="w-full h-full md:h-screen border-0 scale-110 md:scale-100 origin-center" 
        title="3D Background"
      />
    </div>
    
      {/* Content Overlay - Mobile Responsive */}
      <div className="mt-10 absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 sm:px-6">
        <div className="text-center space-y-4 sm:space-y-6 pointer-events-auto max-w-xs sm:max-w-lg lg:max-w-2xl">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <img 
              src="/lovable-uploads/f0284862-5f6e-4c0c-8fda-6eb0e0104ecc.png" 
              alt="Symphony Neuro-Tech Logo" 
              className="w-36 h-36 sm:w-36 sm:h-36 lg:w-72 lg:h-72 mx-auto object-contain"
            />
          </div>
          
          {/* Main Description */}
          <h1 className="mb-5 text-white font-montserrat font-medium text-sm sm:text-base lg:text-xl leading-snug max-w-md sm:max-w-lg mx-auto text-center">
            AI-powered, clinic-ready focused ultrasound neuromodulation systems and treatment protocol discovery.
          </h1>
          
          {/* Subtitle */}
          <p className="mb-5 text-white/90 font-montserrat italic font-medium text-xs sm:text-sm lg:text-xl leading-relaxed">
            Designed by among the most experienced pioneers of the field
          </p>
          
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