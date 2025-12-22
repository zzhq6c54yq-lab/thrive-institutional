
import React from "react";
import useTranslation from "@/hooks/useTranslation";

const PortalHeader: React.FC = () => {
  const { isSpanish } = useTranslation();
  
  return (
    <div className="relative bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
          alt={isSpanish ? "Cintas de concienciación sobre el cáncer" : "Cancer awareness ribbons"}
          className="w-full h-full object-cover opacity-20"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-4">
          {isSpanish ? "Portal de Apoyo para el Cáncer" : "Cancer Support Portal"}
        </h1>
        <p className="text-lg text-rose-700 dark:text-rose-300 max-w-2xl mx-auto">
          {isSpanish 
            ? "Recursos integrales y apoyo para pacientes, cuidadores y familias afectadas por el cáncer"
            : "Comprehensive resources and support for patients, caregivers, and families affected by cancer"
          }
        </p>
      </div>
    </div>
  );
};

export default PortalHeader;
