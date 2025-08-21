interface FabricContentProps {
  companyName?: string;
  description?: string;
  launchText?: string;
}

export function FabricContent({
  companyName = "Your Company",
  description = "Crafting the future with elegant technology and innovative solutions.",
  launchText = "Launching Soon"
}: FabricContentProps) {
  return (
    <div className="fabric-content">
      <img 
        src="/lovable-uploads/fb5a62fa-bf47-43bb-bbc1-b8c998332ac1.png" 
        alt="Company Logo" 
        className="fabric-logo"
      />
      
      <h1 className="fabric-title">
        {companyName}
      </h1>
      
      <p className="fabric-description">
        {description}
      </p>
      
      <div className="fabric-badge">
        <span>{launchText}</span>
      </div>
    </div>
  );
}