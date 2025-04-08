import { useState } from "react";
import axios from "axios";

const Step3 = ({ prevStep }) => {  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState("month");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [error, setError] = useState(null);

  // Enhanced subscription plans with annual options
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic Plan",
      priceId: "prod_S5RaU8u8ZwXjTn",
      price: 10,
      annualPrice: 96, 
      currency: "USD",
      features: ["5 Projects", "Basic Analytics", "Email Support", "1 Team Member"],
      interval: "month",
      description: "Perfect for individuals and small projects"
    },
    {
      id: "pro",
      name: "Pro Plan",
      priceId: "price_1RBGiKFaMYHAId8S1iuLLO9m",
      price: 25,
      annualPrice: 240,
      currency: "USD",
      features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "5 Team Members", "Custom Branding"],
      interval: "month",
      description: "Ideal for growing businesses",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      priceId:"price_1RBGinFaMYHAId8SCaCElvFF",
      price: 50,
      annualPrice: 480,
      currency: "USD",
      features: ["Everything in Pro", "Dedicated Account Manager", "API Access", "SSO Authentication", "Unlimited Team Members"],
      interval: "month",
      description: "For large organizations with advanced needs"
    }
  ];

  // Payment gateway options
  const paymentGateways = [
    {
      id: "stripe",
      name: "Credit Card",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      description: "Pay with Visa, Mastercard, or Amex"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.0571 8.4286C19.0571 10.9388 17.0245 13 14.5 13H11.5C11.2239 13 11 13.2239 11 13.5V17.5C11 17.7761 10.7761 18 10.5 18H7.5C7.22386 18 7 17.7761 7 17.5V6.5C7 6.22386 7.22386 6 7.5 6H14.5C17.0245 6 19.0571 7.91836 19.0571 10.4286V8.4286Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M15.0571 10.4286C15.0571 12.9388 13.0245 15 10.5 15H7.5C7.22386 15 7 15.2239 7 15.5V19.5C7 19.7761 6.77614 20 6.5 20H3.5C3.22386 20 3 19.7761 3 19.5V8.5C3 8.22386 3.22386 8 3.5 8H10.5C13.0245 8 15.0571 9.91836 15.0571 12.4286V10.4286Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      description: "Fast and secure payment with PayPal"
    },
    {
      id: "alipay",
      name: "Alipay",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7.5C4 5.567 5.567 4 7.5 4H16.5C18.433 4 20 5.567 20 7.5V16.5C20 18.433 18.433 20 16.5 20H7.5C5.567 20 4 18.433 4 16.5V7.5Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 14.5C12 11.5 16 15 16 15C16 15 14 9 7 9.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      description: "Popular payment method in China"
    },
    {
      id: "wechat",
      name: "WeChat Pay",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 10C9 6.13401 12.134 3 16 3C19.866 3 23 6.13401 23 10C23 13.866 19.866 17 16 17C14.7751 17 13.6311 16.6738 12.6544 16.1015C12.4178 15.9685 12.1555 15.9247 11.8951 15.9772L8.5 16.5L9.0228 13.1049C9.07527 12.8445 9.03151 12.5822 8.89853 12.3456C8.32615 11.3689 8 10.2249 8 9" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 21C4.13401 21 1 17.866 1 14C1 10.134 4.13401 7 8 7" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      description: "Popular payment method in China"
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setError(null);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setError(null);
  };

  const handleProceedToCheckout = async () => {
    if (!selectedPlan) {
      setError("Please select a subscription plan.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Calculate the correct amount based on billing cycle
      const amount = billingCycle === "month" 
        ? selectedPlan.price * 100 
        : selectedPlan.annualPrice * 100;

      let response;
      
      // Handle different payment gateways
      switch(paymentMethod) {
        
        case "stripe":
          response = await axios.post(
            `https://api.quotely.shop/api/payment/create-checkout-session`,
            { 
              selectedPlan: { 
                priceId: selectedPlan.priceId,
                billingCycle: billingCycle
              } 
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          window.location.href = response.data.sessionId.url;
          break;
          
        case "paypal":
          response = await axios.post(
            `${import.meta.env.VITE_HOST_URL}/api/payment/create-paypal-order`,
            { 
              amount,
              currency: selectedPlan.currency,
              planId: selectedPlan.id,
              billingCycle: billingCycle
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          window.location.href = response.data.approvalUrl;
          break;
          
        case "alipay":
          response = await axios.post(
            `${import.meta.env.VITE_HOST_URL}/api/payment/create-alipay-order`,
            { 
              amount,
              currency: selectedPlan.currency,
              planId: selectedPlan.id,
              billingCycle: billingCycle
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          window.location.href = response.data.paymentUrl;
          break;
          
        case "wechat":
          response = await axios.post(
            `${import.meta.env.VITE_HOST_URL}/api/payment/create-wechat-order`,
            { 
              amount,
              currency: selectedPlan.currency,
              planId: selectedPlan.id,
              billingCycle: billingCycle
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          // For WeChat Pay, we might display a QR code instead of redirecting
          // This would require a different handling
          break;
          
        default:
          throw new Error("Invalid payment method selected");
      }
    } catch (error) {
      console.error("Checkout session creation failed:", error);
      setError("Failed to initialize checkout process. Please try again or select a different payment method.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Get the current price based on selected billing cycle
  const getCurrentPrice = (plan) => {
    return billingCycle === "month" ? plan.price : plan.annualPrice;
  };

  // Calculate savings for annual billing (for display purposes)
  const calculateAnnualSavings = (plan) => {
    return (plan.price * 12) - plan.annualPrice;
  };

  // Function to get region-specific payment methods
  const getRegionSpecificMethods = (region) => {
    switch(region) {
      case "western":
        return ["stripe", "paypal"];
      case "china":
        return ["alipay", "wechat"];
      default:
        return ["stripe", "paypal", "alipay", "wechat"];
    }
  };

  // For demo purposes, we'll show all payment methods
  // In a real app, you might detect the user's region or provide a selector
  const availablePaymentMethods = getRegionSpecificMethods("all");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center">1</div>
              <div className="ml-2 text-gray-500">Details</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center">2</div>
              <div className="ml-2 text-gray-500">Plan</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">3</div>
              <div className="ml-2 font-medium">Payment</div>
            </div>
          </div>
        </div>

        <div className="section-heading mb-8 text-center">
          <h2 className="text-3xl font-bold">Choose Your Perfect Plan</h2>
          <p className="text-gray-600 mt-3">Select the plan that best fits your needs</p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingCycle("month")}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === "month" 
                  ? "bg-black text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("year")}
              className={`px-6 py-2 rounded-full transition-all flex items-center ${
                billingCycle === "year" 
                  ? "bg-black text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Annual <span className="ml-1 text-xs font-medium text-green-500">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Subscription Plans - Left Side */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    selectedPlan?.id === plan.id ? 'ring-2 ring-black shadow-lg transform scale-105' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 inset-x-0 text-center py-1 bg-black text-white text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <p className="text-4xl font-bold">
                        {plan.currency === 'USD' ? '$' : ''}
                        {getCurrentPrice(plan)}
                      </p>
                      <p className="text-sm text-gray-500">
                        per {billingCycle === "month" ? "month" : "year"}
                      </p>
                      {billingCycle === "year" && (
                        <p className="text-sm text-green-500 mt-1">
                          Save ${calculateAnnualSavings(plan)} per year
                        </p>
                      )}
                    </div>
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanSelect(plan);
                      }}
                      className={`mt-6 w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedPlan?.id === plan.id 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section - Right Side */}
          <div className="lg:col-span-2">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              {selectedPlan ? (
                <>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{selectedPlan.name}</span>
                    <span>
                      {selectedPlan.currency === 'USD' ? '$' : ''}
                      {getCurrentPrice(selectedPlan)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Billing Cycle</span>
                    <span>{billingCycle === "month" ? "Monthly" : "Annual"}</span>
                  </div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {selectedPlan.currency === 'USD' ? '$' : ''}
                      {getCurrentPrice(selectedPlan)}
                      /{billingCycle === "month" ? "mo" : "yr"}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">Please select a plan to see your order summary</p>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-bold mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                {paymentGateways.filter(gateway => availablePaymentMethods.includes(gateway.id)).map((gateway) => (
                  <div
                    key={gateway.id}
                    onClick={() => handlePaymentMethodSelect(gateway.id)}
                    className={`border p-4 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === gateway.id 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-600">{gateway.icon}</div>
                      <div className="flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full border ${
                          paymentMethod === gateway.id ? 'border-black' : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {paymentMethod === gateway.id && (
                            <div className="w-3 h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{gateway.name}</p>
                      <p className="text-xs text-gray-500">{gateway.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleProceedToCheckout}
                disabled={!selectedPlan || isProcessing}
                className={`px-6 py-3 rounded-lg bg-black text-white transition-colors ${
                  (!selectedPlan || isProcessing) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-800'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Checkout →"
                )}
              </button>
            </div>
            
            {/* Security Notice */}
            <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <p>Secure payment processing. We don&apos;t store your payment information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;