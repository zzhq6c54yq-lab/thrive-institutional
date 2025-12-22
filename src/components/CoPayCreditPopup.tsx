
import React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CoPayCreditPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CoPayCreditPopup: React.FC<CoPayCreditPopupProps> = ({ open, onOpenChange }) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="sm"
        className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200"
        showCloseButton={false}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close popup"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-700 mb-4">
            🎉 Good News!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            You may be eligible for <span className="font-semibold text-blue-600">Co-Pay Credits</span> to help cover your therapy sessions and mental health support.
          </p>
          
          <div className="bg-blue-100 p-3 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Many insurance plans and employers offer mental health benefits that can significantly reduce your out-of-pocket costs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleClose}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Learn More Later
            </Button>
            <Button
              onClick={handleClose}
              variant="default"
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Check Eligibility
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoPayCreditPopup;
