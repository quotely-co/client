import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51O685hSG33pep1pcj2Re8B8s3PQYVnN9pM8nTIhuTcpemvWsPRCbNQBiftR6HQQcziymD5TGzvlVruELvI1y4irt005z22L1m5");

const Step3 = ({ prevStep }) => {  
  const [selectedGateway, setSelectedGateway] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 10,
      currency: "USD",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      interval: "month",
      description: "Perfect for individuals and small projects"
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 25,
      currency: "USD",
      features: ["All Basic Features", "Feature 4", "Feature 5", "Feature 6"],
      interval: "month",
      description: "Ideal for growing businesses",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 50,
      currency: "USD",
      features: ["All Pro Features", "Feature 7", "Feature 8", "Priority Support"],
      interval: "month",
      description: "For large organizations with advanced needs"
    }
  ];

  const paymentGateways = [
    { id: "Stripe", icon: "💳" },
    { id: "Razorpay", icon: "🌐" },
    { id: "PayPal", icon: "💰" }
  ];

  // ... (keeping all the handlers the same as before)
  const handleGatewayChange = (e) => {
    setSelectedGateway(e.target.value);
    setClientSecret("");
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setClientSecret("");
  };

  const handleProceedToPay = async () => {
    if (!selectedPlan) {
      alert("Please select a subscription plan.");
      return;
    }

    if (!selectedGateway) {
      alert("Please select a payment gateway.");
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedGateway === "Stripe") {
        // Handling Stripe Payment Intent
        let response;
        try {
          response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/payment/create-payment-intent`, {
            amount: selectedPlan.price * 100,
            currency: selectedPlan.currency,
            planId: selectedPlan.id,
          });
        } catch (error) {
          console.error("Stripe Payment Initialization Error:", error);
          alert("Failed to initialize Stripe payment. Please try again.");
          return; // Exit early if there's an error
        }
    
        const { clientSecret } = response.data;  // Extract clientSecret
        if (clientSecret) {
          setClientSecret(clientSecret);
        } else {
          alert("Failed to retrieve client secret. Please try again.");
        }
      } else if (selectedGateway === "Razorpay") {
        // Handling Razorpay Order Creation
        let response;
        try {
          response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/payment/create-order`, {
            amount: selectedPlan.price * 100,
            currency: "INR",
            planId: selectedPlan.id,
          });
        } catch (error) {
          console.error("Razorpay Order Creation Error:", error);
          alert("Failed to initialize Razorpay payment. Please try again.");
          return; // Exit early if there's an error
        }
    
        const data = response.data;
        if (data) {
          handleRazorpayPayment(data);
        } else {
          alert("Failed to retrieve Razorpay order details. Please try again.");
        }
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }    

  const handleRazorpayPayment = (order) => {
    const options = {
      key: "rzp_test_JrHZi49O6mvXnR",
      amount: order.amount,
      currency: order.currency,
      name: "Your Company",
      description: `Subscription - ${selectedPlan.name}`,
      order_id: order.id,
      handler: (response) => {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const renderPaymentGateway = () => {
    if (!selectedPlan) return null;

    if (selectedGateway === "Stripe" && clientSecret) {
      return (
        <div className="mt-8 max-w-md mx-auto">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </div>
      );
    }

    if (selectedGateway === "PayPal") {
      return (
        <div id="paypal-button-container" className="mt-8 max-w-md mx-auto"></div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (selectedGateway === "PayPal" && selectedPlan) {
      window.paypal?.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: selectedPlan.price.toString(),
                  currency_code: selectedPlan.currency
                },
                description: `Subscription - ${selectedPlan.name}`
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Payment successful: ${details.id}`);
          });
        },
      }).render("#paypal-button-container");
    }
  }, [selectedGateway, selectedPlan]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">1</div>
              <div className="ml-2">Details</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">2</div>
              <div className="ml-2">Plan</div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">3</div>
              <div className="ml-2">Payment</div>
            </div>
          </div>
        </div>

        <div className="section-heading mb-12">
          <h2 className="section-title">Choose Your Perfect Plan</h2>
          <p className="section-description mt-4">Select the plan that best fits your needs</p>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan)}
              className={`card relative cursor-pointer transform transition-all duration-300 hover:-translate-y-2 ${selectedPlan?.id === plan.id ? 'border-2 border-black shadow-lg' : ''
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="tag bg-black text-white">Most Popular</span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <p className="text-4xl font-bold mb-6">
                  {plan.currency === 'USD' ? '$' : ''}
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600">/{plan.interval}</span>
                </p>
                <div className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Gateway Selection */}
        {selectedPlan && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>
            <div className="grid grid-cols-1 gap-4">
              {paymentGateways.map((gateway) => (
                <label
                  key={gateway.id}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedGateway === gateway.id ? 'border-black bg-gray-50' : 'border-gray-200'
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentGateway"
                    value={gateway.id}
                    checked={selectedGateway === gateway.id}
                    onChange={handleGatewayChange}
                    className="mr-3"
                  />
                  <span className="mr-2">{gateway.icon}</span>
                  <span className="font-medium">{gateway.id}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Payment Gateway UI */}
        {renderPaymentGateway()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-md mx-auto">
          <button
            type="button"
            onClick={prevStep}
            className="btn btn-text"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleProceedToPay}
            disabled={!selectedPlan || !selectedGateway || isProcessing}
            className={`btn btn-primary ${(!selectedPlan || !selectedGateway || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? "Processing..." : "Proceed to Pay →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;