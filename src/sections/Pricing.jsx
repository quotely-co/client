import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const pricingTiers = [
  {
    title: "Basic",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Generate up to 5 quotations/month",
      "Basic templates",
      "Download as PDF",
      "Email support",
      "Limited customization",
    ],
  },
  {
    title: "Standard",
    monthlyPrice: 19,
    buttonText: "Upgrade now",
    popular: true,
    inverse: true,
    features: [
      "Generate up to 100 quotations/month",
      "Custom branding (logo & colors)",
      "Multiple templates",
      "Remove watermark",
      "Advanced PDF exports",
      "Priority email support",
    ],
  },
  {
    title: "Premium",
    monthlyPrice: 49,
    buttonText: "Get Premium",
    popular: false,
    inverse: false,
    features: [
      "Unlimited quotations",
      "Full branding & white-label option",
      "Customizable quotation templates",
      "API access for automation",
      "Team collaboration features",
      "Advanced analytics & insights",
      "Dedicated support",
    ],
  },
];


const Pricing = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const handlePayment = () => {
    navigate('/register'); 
  }
  return (
    <section className="py-24">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">
            Choose a plan that fits your business needs. Start for free and scale as you grow.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={twMerge(
                "card",
                tier.inverse === true && "border-black bg-black text-white"
              )}
            >
              <div className="flex justify-between">
                <h3
                  className={twMerge(
                    "text-lg font-bold text-black/50",
                    tier.inverse === true && "text-white/60"
                  )}
                >
                  {tier.title}
                </h3>
                {tier.popular === true && (
                  <div className="inline-flex rounded-xl border border-white/20 px-4 py-1.5 text-sm">
                    <motion.span
                      className="bg-[linear-gradient(to_right,#dd7ddf,#e1cd86,#bbcb92,#71c2ef,#3bffff)] bg-clip-text font-medium text-transparent"
                      animate={{ backgroundPositionX: "100%" }}
                      transition={{
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                        duration: 1.5,
                      }}
                    >
                      Popular
                    </motion.span>
                  </div>
                )}
              </div>
              <div className="mt-[30px] flex items-baseline gap-1">
                <span className="text-4xl font-bold leading-none tracking-tighter">
                  ${tier.monthlyPrice}
                </span>
                <span className="font-bold tracking-tight text-black/50">
                  /month
                </span>
              </div>
              <button onClick={handlePayment}
                aria-label={`Sign up for ${tier.title} plan`}
                className={twMerge(
                  "btn btn-primary mt-[30px] w-full",
                  tier.inverse === true && "border-white bg-white text-black"
                )}
              >
                {tier.buttonText}
              </button>
              <ul className="mt-8 flex flex-col gap-5">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4 text-sm">
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
