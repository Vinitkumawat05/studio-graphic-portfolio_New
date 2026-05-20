import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

const inputClass =
  'h-[50px] w-full rounded-sm border border-[#ECE8DF]/20 bg-transparent px-4 text-sm text-[#ECE8DF] placeholder:text-[#ECE8DF]/55 transition-colors focus:border-[#ECE8DF]/70 focus:outline-none';

const optionClass = 'bg-[#1C1C1C] text-[#ECE8DF]';

const services = [
  'Logo design',
  'Packaging design',
  'Brand identity development',
  'Website Design & Development',
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    socialLink: '',
    budget: '',
    services: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '54c96001-5396-446f-91f6-ac180dbb3e6e',
          to_email: 'vinitkumawat05@gmail.com',
          from_name: formData.name,
          subject: `New Project Inquiry from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization || 'Not provided',
          social_link: formData.socialLink || 'Not provided',
          budget: formData.budget || 'Not selected',
          services: formData.services.length > 0 ? formData.services.join(', ') : 'None selected',
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
          setFormData({
            name: '',
            organization: '',
            email: '',
            phone: '',
            socialLink: '',
            budget: '',
            services: [],
            message: ''
          });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or email directly to vinitkumawat05@gmail.com');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1C1C1C] text-[#ECE8DF] selection:bg-[#ECE8DF] selection:text-[#1C1C1C]">
      <main className="mx-auto max-w-[1600px] px-6 pb-[50px] pt-[80px] md:px-8 md:pb-28 md:pt-36 lg:px-20">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <img
            src="/assets/icon/Lets Connect.svg"
            alt="Let's connect"
            className="mb-5 h-auto w-full"
          />
          <p className="max-w-[1120px] text-[18px] leading-[1.15] tracking-[0px] text-[#ECE8DF]/55 md:text-[20px]">
            We know every project is unique, and you might have some questions before getting started.
          </p>
        </motion.header>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-24">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="space-y-12"
          >
            <div className="h-[320px] overflow-hidden rounded-md bg-[#515352] md:h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000"
                alt="Studio workspace"
                className="h-full w-full object-cover opacity-70 grayscale"
              />
            </div>

            <div className="space-y-8">
              <div>
                <p className="mb-3 text-base text-[#ECE8DF]/55">Email</p>
                <a
                  href="mailto:vinitkumawat05@gmail.com"
                  className="block text-[24px] leading-none text-[#ECE8DF] transition-colors hover:text-[#ECE8DF]/75 md:text-[30px]"
                >
                  vinitkumawat05@gmail.com
                </a>
              </div>
              <div>
                <p className="mb-3 text-base text-[#ECE8DF]/55">Phone</p>
                <a
                  href="tel:+917862877053"
                  className="block text-[24px] leading-none text-[#ECE8DF] transition-colors hover:text-[#ECE8DF]/75 md:text-[30px]"
                >
                  +91 78628 77053
                </a>
              </div>
              <div>
                <p className="mb-3 text-base text-[#ECE8DF]/55">Location</p>
                <p className="text-[24px] leading-none text-[#ECE8DF] md:text-[30px]">Vadodara, India</p>
              </div>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *"
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Your Business Name"
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email *"
                  required
                  className={inputClass}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="phone *"
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  name="socialLink"
                  value={formData.socialLink}
                  onChange={handleInputChange}
                  placeholder="social link"
                  className={inputClass}
                />
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`${inputClass} cursor-pointer appearance-none`}
                >
                  <option value="" className={optionClass}>select budget</option>
                  <option value="under-5k" className={optionClass}>Under Rs. 5,000</option>
                  <option value="5k-10k" className={optionClass}>Rs. 5,000 - Rs. 10,000</option>
                  <option value="10k-25k" className={optionClass}>Rs. 10,000 - Rs. 25,000</option>
                  <option value="25k-50k" className={optionClass}>Rs. 25,000 - Rs. 50,000</option>
                  <option value="50k+" className={optionClass}>Rs. 50,000+</option>
                </select>
              </div>

              <div className="border-y border-[#ECE8DF]/12 py-7">
                <h2 className="mb-5 text-[18px] font-normal text-[#ECE8DF]">What services are you interested in?</h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <label key={service} className="flex cursor-pointer items-center gap-3 text-[#ECE8DF]/55 transition-colors hover:text-[#ECE8DF]">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="h-3 w-3 cursor-pointer rounded-none border border-[#ECE8DF]/35 bg-transparent accent-[#ECE8DF]"
                      />
                      <span className="text-sm md:text-base">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-b border-[#ECE8DF]/12 pb-7">
                <h2 className="mb-3 text-[18px] font-normal text-[#ECE8DF]">Tell us more about your project</h2>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="message *"
                  rows={6}
                  required
                  className="w-full resize-none rounded-sm border border-[#ECE8DF]/18 bg-transparent px-4 py-3 text-sm text-[#ECE8DF] placeholder:text-[#ECE8DF]/55 transition-colors focus:border-[#ECE8DF]/70 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`flex h-[44px] w-full items-center justify-center gap-2 rounded-sm border px-6 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                  isSubmitting
                      ? 'cursor-not-allowed border-[#ECE8DF]/20 bg-[#ECE8DF]/10 text-[#ECE8DF]/50'
                      : 'border-[#ECE8DF] bg-[#ECE8DF] text-[#1C1C1C] hover:bg-[#ECE8DF]/85'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {isSubmitted && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-[#ECE8DF]">
                  <Check className="h-4 w-4" />
                  Message sent successfully.
                </p>
              )}
            </form>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

