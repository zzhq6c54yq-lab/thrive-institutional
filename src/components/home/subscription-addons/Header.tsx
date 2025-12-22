
import React from 'react';
import BillingToggle from './BillingToggle';

interface HeaderProps {
  getTranslatedText: (key: string) => string | undefined;
  selectedPlan: string | null;
  billingCycle: 'monthly' | 'yearly';
  onBillingChange: (cycle: 'monthly' | 'yearly') => void;
  preferredLanguage: string;
  pricingExplanation: string;
}

const Header: React.FC<HeaderProps> = ({
  getTranslatedText,
  selectedPlan,
  billingCycle,
  onBillingChange,
  preferredLanguage,
  pricingExplanation
}) => {
  const getPaymentPeriodText = (isYearly: boolean) => {
    if (preferredLanguage === 'Español') {
      return isYearly ? 'Anual' : 'Mensual';
    } else if (preferredLanguage === 'Português') {
      return isYearly ? 'Anual' : 'Mensal';
    }
    return isYearly ? 'Yearly' : 'Monthly';
  };

  const savingsText = () => {
    if (preferredLanguage === 'Español') {
      return '¡Ahorra 20%!';
    } else if (preferredLanguage === 'Português') {
      return 'Economize 20%!';
    }
    return 'Save 20%!';
  };

  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
        {getTranslatedText('deepenJourney')}
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        {getTranslatedText('addSpecializedPrograms')}
      </p>
      
      {selectedPlan && (
        <div className="mt-4 mb-2">
          <span className="font-medium text-amber-300 inline-block py-1 px-3 rounded-full bg-amber-900/30 border border-amber-500/20">
            {selectedPlan} {getTranslatedText('planSelected')}
          </span>
          <p className="text-sm text-amber-200/70 mt-2">{pricingExplanation}</p>
        </div>
      )}

      <div className="flex items-center justify-center mt-6">
        <BillingToggle
          billingCycle={billingCycle}
          onBillingChange={onBillingChange}
          getPaymentPeriodText={getPaymentPeriodText}
          savingsText={savingsText()}
        />
      </div>
    </div>
  );
};

export default Header;
