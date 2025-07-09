"use client";

import { Footer } from "../../components/footer";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaAmbulance,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaComment,
  FaEnvelope,
  FaHeart,
  FaPhone,
  FaShieldAlt,
  FaUser
} from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  message: string;
  consent: boolean;
  marketingConsent: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    message: "",
    consent: false,
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote: "Dragale Aviation’s swift response saved my father’s life. Their professionalism is unmatched.",
      author: "Sarah M.",
      role: "Family Member",
    },
    {
      quote: "Their medical transport services are reliable and compassionate, giving us peace of mind.",
      author: "Dr. James R.",
      role: "Physician",
    },
    {
      quote: "A trusted partner for emergency air evacuations, always prioritizing patient safety.",
      author: "Emily T.",
      role: "Hospital Administrator",
    },
  ];

  const whyChooseUs = [
    { icon: FaClock, title: "Rapid Response", description: "24/7 availability for urgent medical transport." },
    { icon: FaShieldAlt, title: "Safety First", description: "State-of-the-art aircraft and trained medical staff." },
    { icon: FaHeart, title: "Compassionate Care", description: "Patient comfort and dignity are our priorities." },
  ];

  const requigreenFields = ["name", "email", "message", "consent"];
  const progress = (requigreenFields.filter((field) => formData[field as keyof FormData]).length / requigreenFields.length) * 100;

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is requigreen";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is requigreen";
    if (!formData.message.trim()) newErrors.message = "Message is requigreen";
    // @ts-ignore
    if (!formData.consent) newErrors.consent = "Consent is requigreen";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));



    const res = await fetch("https://my-hono-app-85f.pages.dev/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {

      alert("Something went wrong while submitting the form please try again");
      setIsSubmitting(false);

      return;
    }



    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      company: "",
      position: "",
      phone: "",
      message: "",
      consent: false,
      marketingConsent: false,
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputVariants = {
    focus: { scale: 1.01, borderColor: "#EF4444", boxShadow: "0 0 6px rgba(239, 68, 68, 0.3)" },
    blur: { scale: 1, borderColor: "rgba(255, 255, 255, 0.2)", boxShadow: "none" },
  };

  return (
    <>

      <div className="pt-30 min-h-screen bg-gradient-to-br from-gray-900 to-black  text-white">
        {/* Breadcrumb Navigation */}


        <main className="px-4 sm:px-8 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 backdrop-blur-2xl bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10"
            >
              <motion.div variants={fieldVariants}>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  <FaAmbulance className="text-gray-300" /> Contact Dragale Aviation
                </h2>
                <p className="text-gray-300 mt-2 text-sm">
                  Reach out for inquiries about our air ambulance services or to coordinate emergency transport.
                </p>
              </motion.div>

              {/* Progress Indicator */}
              <motion.div
                variants={fieldVariants}
                className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden my-6"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <motion.div variants={fieldVariants} className="relative">
                    <label htmlFor="name" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                      <FaUser /> Name
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full p-3 mt-1.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition-all"
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-green-400 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fieldVariants} className="relative">
                    <label htmlFor="email" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                      <FaEnvelope /> Email
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full p-3 mt-1.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition-all"
                      placeholder="Your Email"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-green-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </motion.div>

                  {/* Company */}
                  <motion.div variants={fieldVariants} className="relative">
                    <label htmlFor="company" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                      <FaBuilding /> Company
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-3 mt-1.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition-all"
                      placeholder="Your Company"
                    />
                  </motion.div>

                  {/* Position */}
                  <motion.div variants={fieldVariants} className="relative">
                    <label htmlFor="position" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                      <FaUser /> Position
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full p-3 mt-1.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition-all"
                      placeholder="Your Position"
                    />
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={fieldVariants} className="relative sm:col-span-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                      <FaPhone /> Phone
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 mt-1.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition-all"
                      placeholder="Your Phone Number"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fieldVariants} className="relative sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-200 flex items-center gap-1.5">
                      <FaComment /> Message
                    </label>
                    <motion.textarea
                      variants={inputVariants}
                      whileFocus="focus"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="w-full p-3 mt-1.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 resize-none max-h-40 transition-all"
                      placeholder="Your Message"
                      rows={5}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-green-400 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </motion.div>
                </motion.div>

                {/* Consent Section */}
                <motion.div variants={containerVariants} className="space-y-4">
                  <motion.div variants={fieldVariants} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-green-400 border-white/20 rounded focus:ring-green-400 bg-white/10"

                      required
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                    />
                    <div className="text-sm text-gray-200">
                      <span className="font-medium">Consent to Use Personal Information</span>
                      <p className="mt-1 text-xs">
                        We collect your name, email, contact number, company, and message to respond to your inquiry. Your
                        data will be retained only as long as necessary.
                      </p>
                      {errors.consent && (
                        <p id="consent-error" className="text-green-400 text-xs mt-1">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={fieldVariants} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="marketingConsent"
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-green-400 border-white/20 rounded focus:ring-green-400 bg-white/10"
                    />
                    <div className="text-sm text-gray-200">
                      <span className="font-medium">Optional Marketing Communication</span>
                      <p className="mt-1 text-xs">
                        Receive updates about Dragale Aviation’s air ambulance services and innovations.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fieldVariants}>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                    type="submit"
                    className={`bg-gray-900/20 text-white py-2.5 px-8 rounded-full font-medium text-base shadow-md transition duration-300 flex items-center gap-2 navbar-glass ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Emergency Contact CTA */}
              {/* <motion.div
                variants={fieldVariants}
                className="backdrop-blur-2xl bg-white/5 p-6 rounded-2xl shadow-xl border border-white/10"
              >
                <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-2">
                  <FaAmbulance className="text-green-400" /> Emergency Contact
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  For immediate medical transport, call our 24/7 hotline.
                </p>
                <motion.a
                  href="tel:+1-800-555-1234"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900/20 navbar-glass text-white py-2 px-6 rounded-full font-medium text-base shadow-md inline-flex items-center gap-2 hover:bg-green-600 transition duration-300"
                  aria-label="Call for emergency services"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaPhone /> +1-800-555-1234
                </motion.a>
              </motion.div> */}

              {/* Why Choose Us */}
              <motion.div
                variants={fieldVariants}
                className="backdrop-blur-2xl bg-white/5 p-6 rounded-2xl shadow-xl border border-white/10"
              >
                <h3 className="text-lg font-medium text-white mb-4">Why Choose Dragale Aviation?</h3>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="text-gray-300 text-xl mt-1" />
                      <div>
                        <h4 className="text-sm font-medium text-white">{item.title}</h4>
                        <p className="text-xs text-gray-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Testimonial */}

            </motion.div>
          </div>
        </main>

        {/* Footer */}
        {/* <Footer/> */}



        {/* Success Modal */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              role="dialog"
              aria-labelledby="success-modal-title"
            >
              <motion.div
                className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20 max-w-sm w-full"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <FaCheckCircle className="text-green-400 text-4xl" />
                  <h3 id="success-modal-title" className="text-xl font-medium text-white">Thank You!</h3>
                  <p className="text-gray-300 text-sm">
                    Your inquiry has been received. We’ll respond promptly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gray-900/20 text-white  py-1.5 px-6 rounded-full font-medium text-sm hover:bg--600 transition duration-300 navbar-glass"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}