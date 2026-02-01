
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 lg:px-24 py-24 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">Let's build<br/>something great.</h2>
            <a 
              href="mailto:hello@studio.design" 
              className="text-2xl md:text-4xl font-light hover:underline underline-offset-8"
            >
              hello@studio.design
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:flex md:flex-col md:justify-end md:items-end">
            <div className="space-y-4 text-right">
              <p className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Social</p>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-lg hover:text-white/60 transition-colors">Instagram</a>
                <a href="#" className="text-lg hover:text-white/60 transition-colors">Dribbble</a>
                <a href="#" className="text-lg hover:text-white/60 transition-colors">Twitter (X)</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30 tracking-widest uppercase">© 2024 STUDIO DESIGN GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-xs text-white/30 tracking-widest uppercase">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
