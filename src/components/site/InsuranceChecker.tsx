import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Check, X, Loader2 } from 'lucide-react';

const InsuranceChecker: React.FC = () => {
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [planName, setPlanName] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ accepted: boolean; message: string } | null>(null);

  // List of accepted insurance providers (simplified for demo)
  const acceptedProviders = [
    'blue cross blue shield',
    'bcbs',
    'united healthcare',
    'unitedhealthcare',
    'aetna',
    'cigna',
    'anthem',
    'humana',
    'kaiser permanente',
    'kaiser',
  ];

  const handleCheck = async () => {
    setChecking(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const providerLower = insuranceProvider.toLowerCase();
    const isAccepted = acceptedProviders.some(provider => 
      providerLower.includes(provider) || provider.includes(providerLower)
    );

    if (isAccepted) {
      setResult({
        accepted: true,
        message: `Great news! We accept ${insuranceProvider}. Your typical copay is $25 per session.`,
      });
    } else {
      setResult({
        accepted: false,
        message: `We don't currently have ${insuranceProvider} in our network, but we offer competitive self-pay rates and can provide superbills for out-of-network reimbursement.`,
      });
    }

    setChecking(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-black border-[#D4AF37]/20 p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-[#D4AF37]" />
          <div>
            <h3 className="text-2xl font-bold text-foreground">Insurance Checker</h3>
            <p className="text-sm text-foreground/60">Check if we accept your insurance</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Insurance Provider *
            </label>
            <Input
              type="text"
              placeholder="e.g., Blue Cross Blue Shield"
              value={insuranceProvider}
              onChange={(e) => setInsuranceProvider(e.target.value)}
              className="bg-background/50 border-border/30 text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Plan Name (Optional)
            </label>
            <Input
              type="text"
              placeholder="e.g., PPO, HMO, Premium"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="bg-background/50 border-border/30 text-foreground"
            />
          </div>

          <Button
            onClick={handleCheck}
            disabled={!insuranceProvider || checking}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
          >
            {checking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              'Check Coverage'
            )}
          </Button>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className={`mt-6 p-6 rounded-lg border ${
                result.accepted
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-amber-500/10 border-amber-500/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {result.accepted ? (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-amber-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${result.accepted ? 'text-green-400' : 'text-amber-400'}`}>
                    {result.accepted ? 'We Accept Your Insurance!' : 'Alternative Options Available'}
                  </h4>
                  <p className="text-sm text-foreground/80">{result.message}</p>
                  <Button className="mt-4 bg-[#D4AF37] hover:bg-[#E5C5A1] text-black font-semibold">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Accepted Providers List */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <h4 className="text-sm font-semibold text-foreground mb-3">Accepted Insurance Providers</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-foreground/70">
              <div>• Blue Cross Blue Shield</div>
              <div>• United Healthcare</div>
              <div>• Aetna</div>
              <div>• Cigna</div>
              <div>• Anthem</div>
              <div>• Humana</div>
              <div>• Kaiser Permanente</div>
              <div>• And more...</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default InsuranceChecker;
