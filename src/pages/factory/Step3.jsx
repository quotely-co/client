import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe outside of component to avoid recreating Stripe object on renders
const stripePromise = loadStripe("pk_test_51O685hSG33pep1pcj2Re8B8s3PQYVnN9pM8nTIhuTcpemvWsPRCbNQBiftR6HQQcziymD5TGzvlVruELvI1y4irt005z22L1m5");

const Step3 = ({ prevStep }) => {  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState("month"); // month or year

  // Enhanced subscription plans with annual options
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 10,
      annualPrice: 96, // 20% discount for annual
      currency: "USD",
      features: ["5 Projects", "Basic Analytics", "Email Support", "1 Team Member"],
      interval: "month",
      description: "Perfect for individuals and small projects"
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 25,
      annualPrice: 240, // 20% discount for annual
      currency: "USD",
      features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "5 Team Members", "Custom Branding"],
      interval: "month",
      description: "Ideal for growing businesses",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 50,
      annualPrice: 480, // 20% discount for annual
      currency: "USD",
      features: ["Everything in Pro", "Dedicated Account Manager", "API Access", "SSO Authentication", "Unlimited Team Members"],
      interval: "month",
      description: "For large organizations with advanced needs"
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceedToCheckout = async () => {
    if (!selectedPlan) {
      alert("Please select a subscription plan.");
      return;
    }

    setIsProcessing(true);

    try {
      // Calculate the correct amount based on billing cycle
      const amount = billingCycle === "month" 
        ? selectedPlan.price * 100 
        : selectedPlan.annualPrice * 100;
        
      // Create a Checkout Session
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/payment/create-checkout-session`, {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        unitAmount: amount,
        currency: selectedPlan.currency,
        interval: billingCycle,
      });

      const { sessionId } = response.data;
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error("Checkout session creation failed:", error);
      alert("Failed to initialize checkout process. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  // Get the current price based on selected billing cycle
  const getCurrentPrice = (plan) => {
    return billingCycle === "month" ? plan.price : plan.annualPrice;
  };

  // Calculate savings for annual billing (for display purposes)
  const calculateAnnualSavings = (plan) => {
    return (plan.price * 12) - plan.annualPrice;
  };

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
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle("month")}
              className={`px-4 py-2 rounded-md ${billingCycle === "month" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("year")}
              className={`px-4 py-2 rounded-md flex items-center ${billingCycle === "year" ? "bg-white shadow-sm" : "text-gray-500"}`}
            >
              Annual <span className="ml-1 text-xs font-medium text-green-500">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                  className={`mt-6 w-full py-2 rounded-lg font-medium ${
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

        {/* Order Summary */}
        {selectedPlan && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
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
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-md mx-auto">
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
            className={`px-6 py-2 rounded-lg bg-black text-white transition-colors ${
              (!selectedPlan || isProcessing) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-800'
            }`}
          >
            {isProcessing ? "Processing..." : "Proceed to Checkout →"}
          </button>
        </div>
        
        {/* Security Notice */}
        <div className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          Secure payment processing with Stripe. We don't store your payment information.
        </div>
      </div>
    </div>
  );
};

export default Step3;