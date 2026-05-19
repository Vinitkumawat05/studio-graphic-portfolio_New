
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Loader2, Download, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Showreel: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["80px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleGenerateVideo = async () => {
    try {
      if (!(window as any).aistudio?.hasSelectedApiKey()) {
        await (window as any).aistudio?.openSelectKey();
      }

      setIsGenerating(true);
      // Initialize GoogleGenAI right before making an API call to ensure current key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Minimalist abstract 3D geometric shapes moving slowly, studio lighting, lime green and black aesthetic, cinematic 4k, clean lines',
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setGeneratedVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
      }
    } catch (error: any) {
      // If the request fails due to invalid key, prompt the user to select a key again
      if (error?.message?.includes("Requested entity was not found.")) {
         await (window as any).aistudio?.openSelectKey();
      }
      console.error("Video Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ scale, borderRadius, opacity }}
          className="relative w-full h-full max-w-[1800px] aspect-video overflow-hidden bg-[#0a0a0a] group shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5"
        >
          {/* Main Video Source */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            src={generatedVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-curves-of-light-in-the-dark-32688-large.mp4"}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
          
          {/* Metadata UI */}
          <div className="absolute top-10 left-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60">Live_Visual_Stream</span>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Feed_ID: STUDIO_REEL_2025</p>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Engine: {generatedVideoUrl ? 'VEO_3.1_GEN' : 'DEFAULT_ARCHIVE'}</p>
            </div>
          </div>

          {/* Center Play Indicator */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls Bar */}
          <div className="absolute bottom-10 inset-x-10 flex items-end justify-between">
            <div className="flex flex-col gap-6">
              <h3 className="text-[45px] md:text-6xl font-normal tracking-[-1px] leading-[45px] md:leading-[0.9] max-w-xl">
                KINETIC <span className="text-white/20">SYSTEMS.</span>
              </h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay}
                  className="w-12 min-h-[48px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-12 min-h-[48px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateVideo}
                disabled={isGenerating}
                className="px-8 py-4 rounded-full bg-[#a3e635] text-black font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 shadow-[0_20px_40px_rgba(163,230,53,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Synthesizing Brand...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {generatedVideoUrl ? 'Regenerate Loop' : 'Generate AI Showreel'}
                  </>
                )}
              </motion.button>
              
              <div className="flex items-center gap-12 text-[10px] font-black tracking-[0.3em] uppercase text-white/20">
                <div className="flex flex-col items-end">
                  <span>Frame_Rate</span>
                  <span className="text-white">60.00 FPS</span>
                </div>
                <div className="flex flex-col items-end">
                  <span>Latency</span>
                  <span className="text-[#a3e635]">0.02 MS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Progress Bar for AI generation */}
          {isGenerating && (
            <div className="absolute bottom-0 left-0 w-full min-h-[4px] bg-white/10">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
                className="h-full bg-[#a3e635] shadow-[0_0_20px_#a3e635]"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Narrative Overlay */}
      <div className="absolute bottom-0 left-0 w-full min-h-[50svh] flex items-center justify-center pointer-events-none px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <p className="text-[11px] font-black tracking-[0.8em] uppercase text-white/40">The_Process</p>
          <h4 className="text-[45px] md:text-4xl font-normal tracking-[-1px] leading-[45px] md:leading-tight max-w-2xl mx-auto">
            Motion is the soul of digital architecture. Every frame is a calculated masterpiece.
          </h4>
        </motion.div>
      </div>
    </section>
  );
};

export default Showreel;
