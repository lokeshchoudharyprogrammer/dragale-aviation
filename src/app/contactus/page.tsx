"use client";

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
  FaUser,
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

  const requiredFields = ["name", "email", "message", "consent"];
  const progress = (requiredFields.filter((field) => formData[field as keyof FormData]).length / requiredFields.length) * 100;

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    // @ts-ignore
    if (!formData.consent) newErrors.consent = "Consent is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
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

    await new Promise((r) => setTimeout(r, 1500));

    try {
      const res = await fetch("https://my-hono-app-85f.pages.dev/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
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
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);



  return (
    <>
      <div className="pt-10 min-h-screen bg-black text-white py-16 px-6 sm:px-12 lg:px-24">
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-lg shadow-black/40"
          >
            <h2 className="font-stretch-normal line-clamp-3 text-4xl font-extrabold tracking-tight flex items-center gap-3 text-white mb-4">
              <FaAmbulance className="font-stretch-normal line-clamp-3 text-gray-400" size={32} /> Contact Dragale Aviation
            </h2>
            <p className="font-stretch-normal line-clamp-3 text-gray-300 mb-8 max-w-lg">
              Reach out for inquiries about our air ambulance services or to coordinate emergency transport.
            </p>

            {/* Progress Bar */}
            <div
              className="w-full h-2 rounded-full bg-white/20 mb-8 overflow-hidden"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gray-500 rounded-full shadow-lg"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    label: "Name",
                    id: "name",
                    icon: FaUser,
                    required: true,
                    type: "text",
                    value: formData.name,
                    name: "name",
                    error: errors.name,
                    placeholder: "Your Name",
                  },
                  {
                    label: "Email",
                    id: "email",
                    icon: FaEnvelope,
                    required: true,
                    type: "email",
                    value: formData.email,
                    name: "email",
                    error: errors.email,
                    placeholder: "you@example.com",
                  },
                  {
                    label: "Company",
                    id: "company",
                    icon: FaBuilding,
                    required: false,
                    type: "text",
                    value: formData.company,
                    name: "company",
                    error: errors.company,
                    placeholder: "Company name",
                  },
                  {
                    label: "Position",
                    id: "position",
                    icon: FaUser,
                    required: false,
                    type: "text",
                    value: formData.position,
                    name: "position",
                    error: errors.position,
                    placeholder: "Your position",
                  },
                  {
                    label: "Phone",
                    id: "phone",
                    icon: FaPhone,
                    required: false,
                    type: "text",
                    value: formData.phone,
                    name: "phone",
                    error: errors.phone,
                    placeholder: "Phone number",
                    fullWidth: true,
                  },
                ].map(({ label, id, icon: Icon, required, type, value, name, error, placeholder, fullWidth }) => (
                  <div
                    key={id}
                    className={`relative ${fullWidth ? "sm:col-span-2" : ""}`}
                  >
                    <label
                      htmlFor={id}
                      className="flex items-center gap-2 text-gray-300 font-semibold text-sm select-none"
                    >
                      <Icon /> {label} {required && <span className="text-red-400">*</span>}
                    </label>
                    <motion.input
                      type={type}
                      id={id}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      placeholder={placeholder}
                      required={required}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-error` : undefined}
                      className={`mt-1 w-full rounded-xl bg-white/10 border ${error ? "border-red-500" : "border-white/20"
                        } px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 transition duration-300 shadow-sm`}
                    />
                    {error && (
                      <p id={`${id}-error`} className="mt-1 text-xs text-red-400 select-none">
                        {error}
                      </p>
                    )}
                  </div>
                ))}

                {/* Message */}
                <div className="sm:col-span-2 relative">
                  <label
                    htmlFor="message"
                    className="font-stretch-normal line-clamp-3 flex items-center gap-2 text-gray-300 font-semibold text-sm select-none"
                  >
                    <FaComment /> Message <span className="text-red-400">*</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    placeholder="Your message here..."
                    rows={6}
                    className={`font-stretch-normal line-clamp-3 mt-1 w-full rounded-xl bg-white/10 border ${errors.message ? "border-red-500" : "border-white/20"
                      } px-4 py-3 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-0 transition duration-300 shadow-sm resize-y`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-400 select-none">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Consents */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                    required
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                    className="h-5 w-5 rounded-md text-gray-400 border-white/30 bg-white/10 focus:ring-gray-400 transition"
                  />
                  <div className="text-sm text-gray-300">
                    <span className="font-stretch-normal line-clamp-3 font-semibold select-none">Consent to Use Personal Information</span>
                    <p className="mt-1 text-xs max-w-lg leading-snug">
                      We collect your name, email, contact number, company, and message to respond to your inquiry. Your data will be retained only as long as necessary.
                    </p>
                    {errors.consent && (
                      <p id="consent-error" className="mt-1 text-xs text-red-400 select-none">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 rounded-md text-gray-400 border-white/30 bg-white/10 focus:ring-gray-400 transition"
                  />
                  <div className="text-sm text-gray-300">
                    <span className="font-semibold select-none">Optional Marketing Communication</span>
                    <p className="mt-1 text-xs max-w-lg leading-snug">
                      Receive updates about Dragale Aviation’s air ambulance services and innovations.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  
                         font-stretch-normal line-clamp-3
                          mt-8 w-full sm:w-auto
                          bg-gradient-to-r from-gray-500 to-gray-600
                          text-white font-semibold py-3 px-10 rounded-full
                          relative overflow-hidden
                          border-2 border-dashed border-gray-400
                          shadow-lg shadow-gray-800/60
                          flex items-center justify-center gap-3
                          transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                          
                          before:absolute before:inset-0 before:rounded-full
                          before:border-2 before:border-dashed before:border-gray-300
                          before:pointer-events-none before:opacity-40 before:blur-sm
                          before:transition-opacity before:duration-300
                          
                          hover:before:opacity-100
                          hover:before:animate-dash-border

                          after:absolute after:inset-[-4px] after:rounded-full
                          after:border-4 after:border-solid after:border-gray-400
                          after:opacity-30 after:blur-lg
                          after:pointer-events-none
                          hover:after:opacity-60
                  `}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </motion.button>

            </form>
          </motion.section>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-10"
          >
            {/* Why Choose Us */}
            <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg shadow-black/40">
              <h3 className="text-2xl font-semibold mb-6 text-white">Why Choose Dragale Aviation?</h3>
              <div className="flex flex-col gap-6">
                {whyChooseUs.map(({ icon: Icon, title, description }, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4"
                  >
                    <Icon className="text-gray-400 text-3xl mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">{title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            {/* <section className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg shadow-black/40 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-white">What Our Clients Say</h3>
              <motion.blockquote
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-gray-300 italic relative before:content-['“'] before:text-gray-400 before:absolute before:-left-4 before:-top-2 before:text-5xl"
              >
                {testimonials[currentTestimonial].quote}
              </motion.blockquote>
              <p className="mt-4 text-gray-400 font-semibold">{testimonials[currentTestimonial].author}</p>
              <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</p>
            </section> */}
          </motion.aside>
        </main>

        {/* Footer */}
        {/* <Footer /> */}

        {/* Success Modal */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
              role="dialog"
              aria-labelledby="success-modal-title"
            >
              <motion.div
                className="backdrop-blur-2xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 max-w-sm w-full"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <FaCheckCircle className="text-gray-400 text-5xl" />
                  <h3 id="success-modal-title" className="text-2xl font-bold text-white">
                    Thank You!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-xs">
                    Your inquiry has been received. We’ll respond promptly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-full font-semibold text-sm shadow-lg shadow-gray-700/50 hover:from-gray-700 hover:to-gray-800 transition duration-300"
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
