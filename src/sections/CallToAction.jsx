"use client";
// Uncomment and import ArrowIcon if needed
// import ArrowIcon from "@/assets/arrow-right.svg";
import starImage from "../assets/star.png";
import springImage from "../assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

 const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip bg-gradient-to-b from-white to-[#D2DCFF] pb-24"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign up for free today</h2>
          <p className="section-description mt-5">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts.
          </p>
          <motion.img
            src={starImage}
            alt="Star Image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{ translateY }}
          />
          <motion.img
            src={springImage}
            alt="Spring Image"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{ translateY }}
          />
        </div>
        <div className="mt-10 flex justify-center gap-2">
          <button className="btn btn-primary">Get for free</button>
          <button className="btn btn-text gap-1">
            <span>Learn more</span>
            {/* Uncomment this line if you have the ArrowIcon */}
            {/* <ArrowIcon className="h-5 w-5" /> */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction