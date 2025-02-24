"use client";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";
import avatar4 from "../assets/avatar-4.png";
import avatar5 from "../assets/avatar-5.png";
import avatar6 from "../assets/avatar-6.png";
import avatar7 from "../assets/avatar-7.png";
import avatar8 from "../assets/avatar-8.png";
import avatar9 from "../assets/avatar-9.png";
import TestimonialsColumn from "../components/TestimonialsColumn";

const testimonials = [
  {
    text: "Generating quotations for my factory has never been easier! The platform's automation saves me hours every day.",
    imageSrc: avatar1,
    name: "Raj Mehta",
    username: "@rajmanufactures",
  },
  {
    text: "I love how I can customize my quotation templates with my branding and send them instantly to customers.",
    imageSrc: avatar2,
    name: "Sophia Carter",
    username: "@sophiabusiness",
  },
  {
    text: "Our company has seen a 30% increase in client engagement since we started using this quotation tool.",
    imageSrc: avatar3,
    name: "Nikhil Sharma",
    username: "@nikhilindustries",
  },
  {
    text: "With just a few clicks, I can create professional-looking quotations. No more messy spreadsheets!",
    imageSrc: avatar4,
    name: "Elena Hughes",
    username: "@elenaworks",
  },
  {
    text: "The API integration allows us to automate our quotation process and sync it with our CRM seamlessly.",
    imageSrc: avatar5,
    name: "Javier Rodriguez",
    username: "@javitech",
  },
  {
    text: "Now, my customers get instant quotations, and I can close deals much faster. A game-changer for my business!",
    imageSrc: avatar6,
    name: "Arjun Kapoor",
    username: "@arjunexports",
  },
  {
    text: "Tracking and managing quotations has never been this easy. The analytics dashboard gives great insights!",
    imageSrc: avatar7,
    name: "Lisa Brooks",
    username: "@lisabsolutions",
  },
  {
    text: "I run a small factory, and this tool helps me compete with larger businesses by providing instant quotations to clients.",
    imageSrc: avatar8,
    name: "Mohammed Khan",
    username: "@mkhantraders",
  },
  {
    text: "Professional PDF quotations, custom branding, and easy email sending—this platform does it all!",
    imageSrc: avatar9,
    name: "Emily Clark",
    username: "@emilycworks",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex justify-center">
          <div className="tag">Testimonials</div>
        </div>
        <div className="section-heading">
          <h2 className="section-title mt-5">What our users say</h2>
          <p className="section-description mt-5">
            From instant quotes to seamless automation, businesses rely on our platform to simplify their sales process.
          </p>
        </div>
        <div className="mt-10 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn columnData={firstColumn} duration={15} />
          <TestimonialsColumn
            columnData={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            columnData={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
