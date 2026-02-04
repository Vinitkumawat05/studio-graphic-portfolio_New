import React, { useState } from 'react';
import Footer from '../components/Footer';
import DesignerAI from '../components/DesignerAI';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Instagram, Twitter, ExternalLink, Check, Loader2 } from 'lucide-react';

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
    window.scrollTo(0, 0);
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
      // Send form data via Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '54c96001-5396-446f-91f6-ac180dbb3e6e', // Replace with your Web3Forms access key
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

        // Reset form after showing success
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <main className="px-6 md:px-12 lg:px-20 max-w-[2200px] mx-auto pt-40 pb-32">
        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-16"
          >
            {/* Heading */}
            <div>
              <span className="inline-block w-2 h-2 bg-white rounded-full mb-4"></span>
              <h1 className="text-5xl md:text-6xl font-normal leading-tight mb-8">
                Get in Touch.
              </h1>
              <p className="text-base text-white/60 leading-relaxed max-w-sm">
                We know every project is unique, and you might have some questions before getting started.
              </p>
            </div>

            {/* Email */}
            <div>
              <a 
                href="mailto:vinit@studio.design"
                className="group text-2xl md:text-3xl font-normal hover:text-white/80 transition-colors block"
              >
                vinitkumawat05@gmail.com
              </a>
              <p className="text-sm text-white/40 mt-2">Email</p>
            </div>

            {/* Phone */}
            <div>
              <a 
                href="tel:+917862877053"
                className="group text-base font-normal hover:text-white/80 transition-colors block"
              >
                +91 78628-77053
              </a>
              <p className="text-sm text-white/40 mt-2">Phone</p>
            </div>

            {/* Address */}
            <div>
              <p className="text-base font-normal block">
                Vadodara, India
              </p>
              <p className="text-sm text-white/40 mt-2">Location</p>
            </div>

           
            
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Organization - Two Columns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Your Organization Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Email and Phone - Two Columns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@gmail.com *"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Social Link and Budget - Two Columns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text"
                    name="socialLink"
                    value={formData.socialLink}
                    onChange={handleInputChange}
                    placeholder="Your Social Link (Optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-black text-white">Select a Budget</option>
                    <option value="under-5k" className="bg-black text-white">Under ₹5000</option>
                    <option value="5k-10k" className="bg-black text-white">₹5,000 - ₹10,000</option>
                    <option value="10k-25k" className="bg-black text-white">₹10,000 - ₹25,000</option>
                    <option value="25k-50k" className="bg-black text-white">₹25,000 - ₹50,000</option>
                    <option value="50k+" className="bg-black text-white">50,000+</option>
                  </select>
                </div>
              </div>

              {/* Services Section */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-white text-lg font-medium mb-6">What services are you interested in?</h3>
                <div className="space-y-4">
                  {['Logo design', 'Brand identity development', 'Packaging design', 'Brand consultation', 'Website Design & Development'].map((service) => (
                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="w-5 h-5 rounded border border-white/20 bg-white/5 cursor-pointer accent-white"
                      />
                      <span className="text-white/80 group-hover:text-white transition-colors">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Section */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-white text-lg font-medium mb-6">Tell us more about your project</h3>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message *"
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 px-6 border font-medium text-sm uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitted 
                      ? 'bg-lime-400 border-lime-400 text-black' 
                      : isSubmitting
                        ? 'bg-white/10 border-white/20 text-white/50 cursor-not-allowed'
                        : 'bg-black border-white/20 hover:bg-white hover:text-black text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      Message Sent!
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
      <DesignerAI />
    </div>
  );
};

export default ContactPage;
