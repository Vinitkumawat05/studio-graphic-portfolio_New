import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 lg:px-24 py-24 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32 mb-24">
          <div>
            <h2 className="text-6xl md:text-[80px] font-normal tracking-tighter mb-12">Let's build<br/>something great.</h2>
            <a 
              href="mailto:hello@studio.design" 
              className="text-2xl md:text-4xl font-light hover:underline underline-offset-8"
            >
              hello@studio.design
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 w-[300px] md:ml-auto">
            {/* Navigation Column */}
            <div className="space-y-4">
              <a href="/work" className="block text-lg font-black, normal hover:text-white/60 transition-colors">Work</a>
              <a href="/#contact" className="block text-lg font-black, normal hover:text-white/60 transition-colors">Contact</a>
            </div>

            {/* Social Column */}
            <div className="space-y-4 md:text-right">
              <a href="#" className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-white/60 transition-colors">
                Instagram <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-white/60 transition-colors">
                LinkedIn <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-white/60 transition-colors">
                Behance~ <ExternalLink className="w-4 h-4" />
              </a>
              <a href="mailto:hello@studio.design" className="flex md:justify-end items-center gap-2 text-lg font-black, normal hover:text-white/60 transition-colors">
                Email <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-6">
          <p className="text-xs text-white tracking-widest sentancecase">© 2024 STUDIO DESIGN GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-col md:flex-row gap-8 text-xs text-white/30 tracking-widest sentancecase">
            <div className="text-sm text-white/40">
              <p>Mumbai</p>
              <p>India, Asia</p>
            </div>
            <div className="flex gap-8">
              <a className="hover:text-white">Terms & Conditions</a>
              <a className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
