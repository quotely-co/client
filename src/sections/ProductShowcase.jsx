"use client";
import productImage from "../assets/product-image.png";
import pyramidImage from "../assets/pyramid.png";
import tubeImage from "../assets/tube.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24"
    >
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Boost productivity</div>
          </div>
          <h2 className="section-title mt-5">
            A more effective way to track progress
          </h2>
          <p className="section-description mt-5">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts.
          </p>
        </div>
        <div className="relative">
          <img src={productImage} alt="Product" className="mt-10" />
          <motion.div
            className="absolute -right-36 -top-32 hidden md:block"
            style={{ y: translateY }}  // Using 'y' instead of 'translateY'
          >
            <img src={pyramidImage.src} alt="Pyramid" height={262} width={262} />
          </motion.div>
          <motion.div
            className="absolute -left-36 bottom-24 hidden md:block"
            style={{ y: translateY }}  // Using 'y' instead of 'translateY'
          >
            <img src={tubeImage.src} alt="Tube" height={248} width={248} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
