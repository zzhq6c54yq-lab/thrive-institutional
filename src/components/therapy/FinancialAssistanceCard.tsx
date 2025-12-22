import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, DollarSign, Users, HandHelping, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FinancialHelpModal } from "./FinancialHelpModal";

export function FinancialAssistanceCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-[hsl(var(--primary))]/10 via-[#D4AF37]/5 to-[hsl(var(--primary))]/10 border-[hsl(var(--primary))]/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <motion.div 
                className="p-3 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[#D4AF37]/20 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-6 h-6 text-[hsl(var(--primary))]" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2" style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Financial Struggle? Let Us Help
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mental health care should be accessible to everyone. If the cost of therapy is a barrier, 
                  we offer flexible options to make sessions affordable.
                </p>

                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[hsl(var(--primary))]" />
                    <span>Sliding Scale</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[hsl(var(--primary))]" />
                    <span>Community Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HandHelping className="w-4 h-4 text-[hsl(var(--primary))]" />
                    <span>Payment Plans</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[#D4AF37] hover:opacity-90 font-semibold group"
                >
                  Learn How We Can Help
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <FinancialHelpModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}