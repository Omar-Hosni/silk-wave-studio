import { FabricWaveBackground } from "@/components/FabricWaveBackground";
import { FabricContent } from "@/components/FabricContent";

const Index = () => {
  return (
    <div className="fabric-container">
      <FabricWaveBackground 
        contourFrequency={120}
        warpAmount={0.3}
        cursorStrength={0.8}
        speed={0.2}
      />
      <FabricContent 
        companyName="Lovable"
        description="Crafting the future with elegant technology and innovative AI-powered solutions that transform ideas into reality."
        launchText="Launching Soon"
      />
    </div>
  );
};

export default Index;