
import React from "react";
import { Briefcase } from "lucide-react";

const EmployeeBanner: React.FC = () => (
  <div className="bg-gradient-to-r from-[#22C55E]/30 to-[#4ADE80]/30 p-6 rounded-xl backdrop-blur-md border border-green-500/30 shadow-lg">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="p-4 bg-white/10 rounded-full">
        <Briefcase className="h-10 w-10 text-[#22C55E]" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Employee Mental Wellness Resources
        </h2>
        <p className="text-white/80">
          Specialized resources to support your mental health in the workplace and help you thrive both professionally and personally.
        </p>
      </div>
    </div>
  </div>
);

export default EmployeeBanner;
