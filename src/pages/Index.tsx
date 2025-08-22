import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

    {/* Responsive Spline iframe */}
    <div className="absolute top-0 left-0 w-full h-full md:h-[93vh] overflow-hidden">
      <iframe
        src="https://my.spline.design/claritystream-nqmLPOqSvUSlljKa81x5kdY7/"
        className="w-full h-full md:h-screen border-0 scale-110 md:scale-100 origin-center" 
        title="3D Background"
      />
    </div>
    
      {/* Content Overlay - Mobile Responsive */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4 sm:px-6">
        <div className="text-center space-y-6 sm:space-y-8 pointer-events-auto max-w-sm sm:max-w-md">
          <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 sm:px-6 sm:py-3">
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