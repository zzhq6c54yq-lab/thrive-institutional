
import React from "react";
import useTranslation from "@/hooks/useTranslation";

interface PortalHeaderProps {
  title: string;
  subtitle: string;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ title, subtitle }) => {
  const { preferredLanguage } = useTranslation();
  
  return (
    <div className="text-center mb-10 relative z-10">
      <h1 className="text-4xl font-semibold mb-4 text-[#D4AF37]">{title}</h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto">
        {subtitle}
      </p>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"></div>
    </div>
  );
};

export default PortalHeader;
