import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";

// Import beer images
import beer1Img from "@assets/beer_1771744334422.png";
import beer2Img from "@assets/beer-2_1771744334415.jpg";
import beer3Img from "@assets/beer-3_1771744334422.png";
import beer4Img from "@assets/shakesbierre-drink-4_1771742996776.webp"; // Using available drink as fallback if needed or another beer

const beers = [
  { id: 1, name: "Romeo's Swagger", img: beer1Img, desc: "A smooth wheat ale for the hopeless romantic", gradient: "radial-gradient(#3D1A00, #000)" },
  { id: 2, name: "Ale Othello", img: beer2Img, desc: "Bold, dark, and dangerously complex", gradient: "radial-gradient(#0A0A1A, #000)" },
  { id: 3, name: "Taming of the Brew", img: beer3Img, desc: "A wild IPA with a spicy finish", gradient: "radial-gradient(#1A0A00, #000)" },
  { id: 4, name: "Brisky Brutus", img: beer4Img, desc: "Crisp lager with a character-defining bite", gradient: "radial-gradient(#0D1500, #000)" },
];

export default function BeerShowcase() {
  const [activeBeer, setActiveBeer] = useState(beers[0]);

  return (
    <section className="relative py-24 bg-black overflow-hidden border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-gold-gradient mb-4"
          >
            OUR CRAFT
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body italic text-gold-pale text-xl"
          >
            "Brewed with Intention. Poured with Pride."
          </motion.p>
        </div>

        {/* Marquee Strip */}
        <div className="relative w-full overflow-hidden py-6 border-y border-gold/20 mb-20">
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                {beers.map((beer) => (
                  <span key={beer.id} className="font-heading text-gold/60 text-xl tracking-[0.2em] uppercase mx-8 flex items-center gap-8">
                    {beer.name} <span className="text-gold">★</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Spotlight area */}
        <div className="max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBeer.id}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              <div 
                className="w-full aspect-[4/5] md:aspect-video max-w-2xl rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_50px_rgba(201,148,42,0.15)] relative mb-8"
                style={{ background: activeBeer.gradient }}
              >
                <img 
                  src={activeBeer.img} 
                  alt={activeBeer.name} 
                  className="w-full h-full object-contain p-8 md:p-12"
                />
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-white mb-4">{activeBeer.name}</h3>
              <p className="font-body italic text-gold text-xl md:text-2xl">{activeBeer.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-6 md:gap-10">
          {beers.map((beer) => (
            <button
              key={beer.id}
              onClick={() => setActiveBeer(beer)}
              className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                activeBeer.id === beer.id 
                ? 'scale-110 border-2 border-gold shadow-[0_0_20px_rgba(201,148,42,0.5)]' 
                : 'border border-gold/20 grayscale opacity-50 hover:opacity-100 hover:grayscale-0'
              }`}
            >
              <div className="absolute inset-0" style={{ background: beer.gradient }} />
              <img src={beer.img} alt={beer.name} className="relative z-10 w-full h-full object-contain p-2" />
            </button>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
