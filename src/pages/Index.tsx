import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Spline 3D Background */}
      <iframe 
        src="https://my.spline.design/claritystream-nqmLPOqSvUSlljKa81x5kdY7/"
        className="absolute inset-0 w-full h-[90%] border-0"
        title="3D Background"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center space-y-8 pointer-events-auto">
          <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3">
            <span className="text-primary font-medium">Launching Soon</span>
          </div>
          
          <Button 
            onClick={() => navigate('/contact')}
            variant="outline"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;