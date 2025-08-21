import { FabricWaveBackground } from "@/components/FabricWaveBackground";
import { FabricContent } from "@/components/FabricContent";
import { CustomCursor } from "@/components/CustomCursor";

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
        companyName="Symphony Neuro-Tech"
        description="AI-powered, clinic-ready focused ultrasound neuromodulation systems and treatment protocol discovery."
        subtitle="Designed by among the most experienced pioneers of the field"
        launchText="Launching Soon"
      />
      <CustomCursor />
    </div>
  );
};

export default Index;