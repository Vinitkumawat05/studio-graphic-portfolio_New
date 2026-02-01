import React from 'react';
import Footer from '../components/Footer';
import DesignerAI from '../components/DesignerAI';
import { motion } from 'motion/react';
import { Mail, Linkedin, Instagram, Twitter, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <main className="px-6 md:px-12 lg:px-20 max-w-[2200px] mx-auto pt-32">
        {/* Header Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-8">Get in Touch</p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
              LET'S CREATE<br />
              <span className="text-white/20">SOMETHING GREAT.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Have a project in mind? Let's discuss how we can bring your vision to life. I'm always excited to collaborate on innovative designs and creative solutions.
            </p>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="mb-32 grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div {...sectionReveal} className="space-y-12">
            <div>
              <h3 className="text-[10px] font-black tracking-[0.6em] text-lime-400 uppercase mb-6">Email</h3>
              <a 
                href="mailto:hello@studio.design"
                className="text-3xl md:text-4xl font-black hover:text-lime-400 transition-colors"
              >
                hello@studio.design
              </a>
            </div>

            <div>
              <h3 className="text-[10px] font-black tracking-[0.6em] text-lime-400 uppercase mb-6">Phone</h3>
              <a 
                href="tel:+1234567890"
                className="text-2xl md:text-3xl font-black hover:text-lime-400 transition-colors"
              >
                +1 (234) 567-8900
              </a>
            </div>

            <div>
              <h3 className="text-[10px] font-black tracking-[0.6em] text-lime-400 uppercase mb-6">Location</h3>
              <p className="text-xl md:text-2xl font-black">
                San Francisco, CA
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div {...sectionReveal} className="space-y-8">
            <div>
              <h3 className="text-[10px] font-black tracking-[0.6em] text-lime-400 uppercase mb-8">Follow Along</h3>
              <div className="space-y-4">
                <a 
                  href="#"
                  className="group flex items-center gap-4 text-lg font-black hover:text-lime-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="#"
                  className="group flex items-center gap-4 text-lg font-black hover:text-lime-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="#"
                  className="group flex items-center gap-4 text-lg font-black hover:text-lime-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter (X)</span>
                </a>
                <a 
                  href="#"
                  className="group flex items-center gap-4 text-lg font-black hover:text-lime-400 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Dribbble</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Form Section */}
        <section className="mb-32 max-w-2xl">
          <motion.div {...sectionReveal}>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-12">Send Me a Message</h2>
            
            <form className="space-y-8">
              <div>
                <label className="block text-sm font-black tracking-widest text-white/40 uppercase mb-3">Name</label>
                <input 
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-black tracking-widest text-white/40 uppercase mb-3">Email</label>
                <input 
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-black tracking-widest text-white/40 uppercase mb-3">Project Details</label>
                <textarea 
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                ></textarea>
              </div>

              <button className="group flex items-center gap-4 px-10 py-5 rounded-full bg-lime-400 text-black font-black tracking-widest uppercase hover:shadow-[0_10px_30px_rgba(163,230,53,0.3)] transition-all">
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </section>
      </main>
      <Footer />
      <DesignerAI />
    </div>
  );
};

export default ContactPage;
