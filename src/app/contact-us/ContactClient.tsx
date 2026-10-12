'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
} from 'react-icons/fa';

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

export default function ContactUs({
  headingLevel = 1,
}: {
  headingLevel?: 1 | 2;
}) {
  const isEmbedded = headingLevel === 2;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    message: '',
    consent: false,
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const whyChooseUs = [
    {
      icon: FaClock,
      title: 'Rapid Response',
      description: '24/7 availability for urgent medical transport.',
    },
    {
      icon: FaShieldAlt,
      title: 'Safety First',
      description: 'State-of-the-art aircraft and trained medical staff.',
    },
    {
      icon: FaHeart,
      title: 'Compassionate Care',
      description: 'Patient comfort and dignity are our priorities.',
    },
  ];

  const requiredFields = ['name', 'email', 'message', 'consent'];
  const progress =
    (requiredFields.filter((field) => formData[field as keyof FormData])
      .length /
      requiredFields.length) *
    100;

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = 'Valid email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.consent) newErrors.consent = 'Consent is required';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      const res = await fetch('https://my-hono-app-85f.pages.dev/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        phone: '',
        message: '',
        consent: false,
        marketingConsent: false,
      });
    } catch {
      alert('Something went wrong. Please try again.');
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

  return (
    <>
      <div
        className={
          isEmbedded
            ? 'bg-white text-gray-900 py-10 px-4 sm:px-8 lg:px-16 pt-30'
            : 'pt-32 pb-16 min-h-screen bg-gray-50 text-gray-900 px-6 sm:px-12 lg:px-24'
        }
      >
        <main
          className={`max-w-7xl mx-auto flex flex-col lg:flex-row ${
            isEmbedded ? 'gap-16 scroll-mt-28' : 'gap-24'
          }`}
        >
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            {headingLevel === 2 ? (
              <h2 className="font-extrabold text-5xl md:text-7xl tracking-tighter uppercase text-gray-900 mb-6 leading-none">
                Contact <br/><span className="text-gray-400">Us</span>
              </h2>
            ) : (
              <h1 className="font-extrabold text-5xl md:text-7xl tracking-tighter uppercase text-gray-900 mb-6 leading-none">
                Contact <br/><span className="text-gray-400">Us</span>
              </h1>
            )}
            <p className="text-xl text-gray-600 font-light mb-12 max-w-lg">
              Reach out for inquiries about our air ambulance services or to
              coordinate emergency transport.
            </p>

            {/* Progress Bar */}
            <progress
              className="sr-only"
              value={Math.round(progress)}
              max={100}
              aria-label="Form progress"
            />
            <div
              className="w-full h-1 bg-gray-200 mb-12 overflow-hidden"
              aria-hidden="true"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gray-900"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {[
                  {
                    label: 'Name',
                    id: 'name',
                    required: true,
                    type: 'text',
                    value: formData.name,
                    name: 'name',
                    error: errors.name,
                    placeholder: 'Your Name',
                  },
                  {
                    label: 'Email',
                    id: 'email',
                    required: true,
                    type: 'email',
                    value: formData.email,
                    name: 'email',
                    error: errors.email,
                    placeholder: 'you@example.com',
                  },
                  {
                    label: 'Company',
                    id: 'company',
                    required: false,
                    type: 'text',
                    value: formData.company,
                    name: 'company',
                    error: errors.company,
                    placeholder: 'Company name',
                  },
                  {
                    label: 'Position',
                    id: 'position',
                    required: false,
                    type: 'text',
                    value: formData.position,
                    name: 'position',
                    error: errors.position,
                    placeholder: 'Your position',
                  },
                  {
                    label: 'Phone',
                    id: 'phone',
                    required: false,
                    type: 'text',
                    value: formData.phone,
                    name: 'phone',
                    error: errors.phone,
                    placeholder: 'Phone number',
                    fullWidth: true,
                  },
                ].map(
                  ({
                    label,
                    id,
                    required,
                    type,
                    value,
                    name,
                    error,
                    placeholder,
                    fullWidth,
                  }) => (
                    <div
                      key={id}
                      className={`relative ${fullWidth ? 'sm:col-span-2' : ''}`}
                    >
                      <label
                        htmlFor={id}
                        className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2"
                      >
                        {label} {required && <span className="text-gray-900">*</span>}
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
                        className={`w-full bg-transparent border-b ${
                          error ? 'border-red-500' : 'border-gray-300'
                        } py-3 text-xl placeholder-gray-300 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors`}
                      />
                      {error && (
                        <p
                          id={`${id}-error`}
                          className="mt-2 text-xs font-bold tracking-widest uppercase text-red-500"
                        >
                          {error}
                        </p>
                      )}
                    </div>
                  )
                )}

                {/* Message */}
                <div className="sm:col-span-2 relative">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2"
                  >
                    Message <span className="text-gray-900">*</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    placeholder="Tell us about your needs..."
                    rows={4}
                    className={`w-full bg-transparent border-b ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } py-3 text-xl placeholder-gray-300 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors resize-y`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-xs font-bold tracking-widest uppercase text-red-500"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Consents */}
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                    required
                    aria-describedby={
                      errors.consent ? 'consent-error' : undefined
                    }
                    className="mt-1 h-5 w-5 rounded-sm border-gray-300 text-gray-900 focus:ring-gray-900 transition-colors"
                  />
                  <div>
                    <label htmlFor="consent" className="text-sm font-semibold text-gray-900 cursor-pointer">
                      Consent to Use Personal Information
                    </label>
                    <p className="mt-1 text-sm text-gray-500 font-light max-w-xl">
                      We collect your details to respond to your inquiry. Your data will be retained only as long as necessary.
                    </p>
                    {errors.consent && (
                      <p
                        id="consent-error"
                        className="mt-2 text-xs font-bold tracking-widest uppercase text-red-500"
                      >
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-5 w-5 rounded-sm border-gray-300 text-gray-900 focus:ring-gray-900 transition-colors"
                  />
                  <div>
                    <label htmlFor="marketingConsent" className="text-sm font-semibold text-gray-900 cursor-pointer">
                      Optional Marketing Communication
                    </label>
                    <p className="mt-1 text-sm text-gray-500 font-light max-w-xl">
                      Receive updates about Dragale Aviation’s air ambulance services and innovations.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 bg-gray-900 text-white font-semibold py-4 px-12 rounded-full uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </motion.button>
            </form>
          </motion.section>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-96 flex flex-col pt-10 lg:pt-0"
          >
            {headingLevel === 2 ? (
              <h3 className="text-3xl font-extrabold uppercase tracking-tighter text-gray-900 mb-10">
                Why Choose <br/><span className="text-gray-400">Us?</span>
              </h3>
            ) : (
              <h2 className="text-3xl font-extrabold uppercase tracking-tighter text-gray-900 mb-10">
                Why Choose <br/><span className="text-gray-400">Us?</span>
              </h2>
            )}
            <div className="flex flex-col gap-10">
              {whyChooseUs.map(({ icon: Icon, title, description }, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <Icon className="text-gray-400 text-3xl" />
                  <h4 className="text-xl font-bold tracking-tight text-gray-900">
                    {title}
                  </h4>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
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
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
              role="dialog"
              aria-labelledby="success-modal-title"
            >
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 max-w-sm w-full"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <FaCheckCircle className="text-green-500 text-5xl" />
                  <h3
                    id="success-modal-title"
                    className="text-2xl font-bold text-gray-900"
                  >
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-sm max-w-xs">
                    Your inquiry has been received. We’ll respond promptly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gray-900 text-white py-3 px-8 rounded-full font-semibold text-sm shadow-md hover:bg-gray-800 transition duration-300"
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
