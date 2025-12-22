import { AlertTriangle, Phone, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CrisisResource {
  name: string;
  contact: string;
  description: string;
}

interface SafetySectionProps {
  crisisResources: CrisisResource[];
  whenToSeekHelp: string;
  contraindications?: string[];
}

export const SafetySection = ({
  crisisResources,
  whenToSeekHelp,
  contraindications
}: SafetySectionProps) => {
  return (
    <div className="space-y-6 mt-8">
      {/* When to Seek Help */}
      <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              When to Seek Professional Help
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {whenToSeekHelp}
            </p>
          </div>
        </div>
      </Card>

      {/* Crisis Resources */}
      <Card className="p-6 border-l-4 border-l-rose-500 bg-rose-50/50 dark:bg-rose-950/20">
        <div className="flex gap-3">
          <Phone className="h-5 w-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-rose-900 dark:text-rose-100 mb-3">
              Crisis Resources - Available 24/7
            </h3>
            <div className="space-y-3">
              {crisisResources.map((resource, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium text-rose-900 dark:text-rose-100">
                    {resource.name}
                  </div>
                  <div className="text-rose-700 dark:text-rose-300 font-mono">
                    {resource.contact}
                  </div>
                  <div className="text-rose-600 dark:text-rose-400 text-xs mt-1">
                    {resource.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Contraindications */}
      {contraindications && contraindications.length > 0 && (
        <Card className="p-6 border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20">
          <div className="flex gap-3">
            <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Important Considerations
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                This workshop may not be appropriate if you experience:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-purple-700 dark:text-purple-300">
                {contraindications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-3">
                If any of these apply, please consult with a mental health professional before proceeding.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
