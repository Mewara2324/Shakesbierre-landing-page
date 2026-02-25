import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ChevronLeft, ChevronRight, MapPin, Clock, Phone, Instagram, Facebook, Wifi, Car, Accessibility, GlassWater } from "lucide-react";

import BeerShowcase from "@/components/BeerShowcase";

import fullLogo from "@assets/shakesbierre-full-logo_1771742996777.png";
import glitterLogo from "@assets/Gemini_Generated_Image_1j12dj1j12dj1j12_1771742996775.png";
import heroImg from "@assets/shakesbierre-hero_1771742996777.jpg";
import ambienceImg from "@assets/shakesbierre-ambience_1771742996775.jpg";
import rooftopImg from "@assets/shakesbierre-rooftop_1771742996777.jpg";
import mainareaImg from "@assets/shakesbierre-mainarea_1771742996777.jpg";
import dish1 from "@assets/shakesbierre-dish_1771742996776.webp";
import dish2 from "@assets/shakesbierre-dish-3_1771742996776.webp";
import drink1 from "@assets/shakesbierre-drink-3_1771742996776.webp";
import drink2 from "@assets/shakesbierre-drink-4_1771742996776.webp";

// ----------------- COMPONENTS -----------------

// 1. ANIMATION UTILS
const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.04 }
  }
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedText = ({ text, className }: { text: string, className?: string }) => (
  <motion.div variants={staggerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={className}>
    {text.split(" ").map((word, i) => (
      <motion.span key={i} variants={childVariants} className="inline-block mr-[0.25em]">
        {word}
      </motion.span>
    ))}
  </motion.div>
);

// KINETIC TYPOGRAPHY — letter-by-letter reveal with spring physics
const KineticText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.04, delayChildren: delay } }
    }}
    style={{ perspective: 600 }}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        variants={{
          hidden: { opacity: 0, y: 40, rotateX: -90 },
          visible: {
            opacity: 1, y: 0, rotateX: 0,
            transition: { type: "spring", damping: 12, stiffness: 200 }
          }
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.div>
);

// KINETIC WORD — word-by-word reveal with sway
const KineticWords = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.15, delayChildren: delay } }
    }}
  >
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-[0.3em]"
        variants={{
          hidden: { opacity: 0, y: 30, rotate: -3 },
          visible: {
            opacity: 1, y: 0, rotate: 0,
            transition: { type: "spring", damping: 15, stiffness: 150 }
          }
        }}
      >
        {word}
      </motion.span>
    ))}
  </motion.div>
);

// ACT DIVIDER — storytelling scene transitions
const ActDivider = ({ act, title }: { act: string; title: string }) => (
  <motion.div
    className="py-16 flex flex-col items-center justify-center gap-4 overflow-hidden snap-section"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8 }}
  >
    <div className="flex items-center gap-4 w-full max-w-xl mx-auto px-6">
      <motion.div
        className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-gold/50"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <div className="text-center shrink-0">
        <p className="font-heading text-gold/40 text-[10px] tracking-[0.5em] uppercase">{act}</p>
        <p className="font-heading text-gold tracking-[0.3em] uppercase text-xs mt-1">{title}</p>
      </div>
      <motion.div
        className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-gold/50"
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
    <motion.div
      className="w-1 h-1 rounded-full bg-gold/60"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.4 }}
    />
  </motion.div>
);

// 2. CURTAIN REVEAL
const CurtainReveal = () => (
  <motion.div
    className="w-full h-[2px] bg-gold scale-x-0 animate-[grow-x_1s_ease-out_forwards]"
  >
    <motion.div
      className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ scaleY: 1 }}
      exit={{ scaleY: 0, originY: 0 }}
      transition={{ duration: 1, ease: "circIn", delay: 1 }}
    >
      <div className="w-full h-[2px] bg-gold scale-x-0 animate-[grow-x_1s_ease-out_forwards]" />
      <motion.img
        src={fullLogo}
        alt="Logo"
        className="h-32 mt-8 object-contain"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
    </motion.div>
  </motion.div>
);

// 3. NAVBAR
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gold/25 py-4' : 'bg-transparent py-6'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none cursor-pointer">
          <img
            src={glitterLogo}
            alt="Logo"
            className="h-16 w-16 object-cover rounded-full transition-all duration-300 drop-shadow-[0_0_12px_rgba(201,148,42,0.6)] hover:drop-shadow-[0_0_22px_rgba(255,215,0,0.9)]"
          />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {['About', 'Zones', 'Menu', 'Amenities', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-heading text-cream text-xs uppercase tracking-widest hover:text-gold transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button className="hidden md:block px-6 py-2 border border-gold text-gold font-heading text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300 relative overflow-hidden group">
          <span className="relative z-10">Reserve a Table</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </button>
      </div>
    </motion.nav>
  );
};

// 4. HERO — with parallax depth + kinetic typography + scanline overlay + floating showcase cards
const showcaseCards = [
  { img: drink1, label: "Romeo's Swagger", side: "left" as const, top: "18%", left: "8%", rotate: -6, bobDuration: 4.5, bobDistance: -10, parallaxFactor: 20, delay: 0.3 },
  { img: drink2, label: "Taming of the Brew", side: "left" as const, top: "52%", left: "11%", rotate: 4, bobDuration: 5.2, bobDistance: -14, parallaxFactor: 15, delay: 0.5 },
  { img: dish1, label: "Spicy Chicken Tikka", side: "right" as const, top: "16%", right: "8%", rotate: 5, bobDuration: 4.8, bobDistance: -11, parallaxFactor: 18, delay: 0.4 },
  { img: dish2, label: "Baked Alaska", side: "right" as const, top: "50%", right: "10%", rotate: -4, bobDuration: 5.5, bobDistance: -13, parallaxFactor: 12, delay: 0.6 },
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: cx, y: cy });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100svh] flex items-center justify-center text-center px-4 overflow-hidden pt-20 scanline-overlay snap-section">

      {/* ---- FLOATING SHOWCASE CARDS (desktop only) ---- */}
      <div className="absolute inset-0 z-[5] hidden lg:block pointer-events-none">
        {showcaseCards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-auto group cursor-pointer"
            style={{
              top: card.top,
              ...(card.side === "left" ? { left: card.left } : { right: card.right }),
              width: "clamp(140px, 12vw, 180px)",
            }}
            initial={{
              opacity: 0,
              x: card.side === "left" ? -120 : 120,
              rotate: card.rotate,
            }}
            animate={{
              opacity: 1,
              x: mousePos.x * card.parallaxFactor,
              y: mousePos.y * (card.parallaxFactor * 0.6),
              rotate: card.rotate,
            }}
            whileHover={{
              rotate: 0,
              scale: 1.08,
              zIndex: 50,
              transition: { duration: 0.3 },
            }}
            transition={{
              opacity: { duration: 0.8, delay: card.delay },
              x: { type: "tween", ease: "easeOut", duration: 0.6 },
              y: { type: "tween", ease: "easeOut", duration: 0.6 },
            }}
          >
            <div
              className="relative rounded-sm overflow-hidden border-2 border-gold/40 shadow-[0_0_20px_rgba(201,148,42,0.15)] group-hover:border-gold/80 group-hover:shadow-[0_0_35px_rgba(201,148,42,0.35)] transition-all duration-500"
              style={{
                animation: `float-bob ${card.bobDuration}s ease-in-out infinite`,
                ["--bob-distance" as string]: `${card.bobDistance}px`,
              }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="bg-black/90 border-t border-gold/30 px-3 py-2">
                <p className="font-heading text-gold text-[9px] tracking-[0.2em] uppercase truncate">{card.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto" style={{ y: heroY, opacity: heroOpacity }}>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
          className="mb-8 hidden md:block"
        >
          <img
            src={fullLogo}
            alt="boCHE & ShakesBierre"
            className="w-[clamp(280px,38vw,480px)] h-auto object-contain mx-auto drop-shadow-[0_0_30px_rgba(201,148,42,0.5)]"
          />
        </motion.div>

        {/* Mobile: Kinetic letter-by-letter reveal */}
        <div className="mb-6 md:hidden">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <KineticText text="boCHE" className="font-sans-bold text-white text-5xl tracking-wider text-rgb-split" delay={0} />
            <motion.span
              className="font-display text-gold text-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >&</motion.span>
            <KineticText text="ShakesBierre" className="font-display text-gold-gradient text-5xl leading-tight pb-2" delay={0.2} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="font-heading text-cream tracking-[0.4em] text-lg md:text-xl font-medium uppercase">
            Brewpub <span className="text-gold mx-3 text-sm">★</span> Club
          </h2>
          <KineticWords
            text={'"Drinketh. Eateth. Meeteth."'}
            className="font-body italic text-gold-pale text-xl md:text-3xl mt-4 max-w-2xl"
            delay={0.3}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 mt-16"
        >
          <button className="px-10 py-4 bg-gold text-black font-heading font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-bright transition-colors duration-300 relative overflow-hidden group cursor-pointer">
            <span className="relative z-10">Explore The Venue</span>
            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </button>
          <button className="px-10 py-4 border border-gold text-gold font-heading font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold hover:text-black transition-colors duration-300 relative overflow-hidden group cursor-pointer">
            <span className="relative z-10">View Menu</span>
            <div className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-60"
        animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

// 5. ABOUT
const About = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const bgY = useTransform(aboutScrollProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={aboutRef} id="about" className="relative py-32 bg-[#080500] px-6 border-t border-gold/10 overflow-hidden">

      {/* Parallax background image */}
      <motion.div
        className="absolute inset-[-20%] z-0"
        style={{ y: bgY }}
      >
        <img
          src={ambienceImg}
          alt=""
          className="w-full h-full object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080500] via-transparent to-[#080500]" />
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Side */}
        <div className="flex flex-col gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-gold tracking-[0.5em] uppercase text-[11px] mb-4">
              <span className="mr-3">★</span> The Venue <span className="ml-3">★</span>
            </p>
            <AnimatedText text="Where The Bard Meets The Beat" className="font-display font-extralight tracking-[0.08em] text-5xl lg:text-7xl text-gold-gradient leading-[1.1] mb-6" />
            <p className="font-body text-cream/80 text-lg lg:text-xl leading-[2] tracking-wide font-light max-w-xl">
              20,000 sq. ft. of dual-concept luxury at the heart of Brigade Road. Two worlds. One address. Infinite nights.
            </p>
          </motion.div>

          <div className="w-full h-[1px] bg-gradient-to-r from-gold/50 to-transparent my-4" />

          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h3 className="font-sans-bold text-white text-xl mb-3 flex items-center gap-2">
                Level 4 · <span className="text-rgb-split">boCHE</span> <span className="font-script text-red-neon text-neon-glow font-normal text-2xl ml-1 -mt-1">Club</span>
              </h3>
              <p className="font-body text-cream/70 text-lg">
                High-energy dance floor, world-class DJ nights, and Bengaluru's boldest nightlife experience.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h3 className="font-heading text-gold font-bold text-xl mb-3">
                Level 5 · ShakesBierre
              </h3>
              <p className="font-body text-cream/70 text-lg">
                A Victorian microbrewery steeped in Shakespearean grandeur — craft beers, candlelit alcoves, and theatrical charm.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { num: "20,000", label: "sq. ft. of Venue", delay: 0 },
            { num: "2", label: "Distinct Worlds", delay: 0.2 },
            { num: "4+", label: "Signature Craft Beers", delay: 0.4 },
            { num: "1", label: "Night You Won't Forget", delay: 0.6 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              className="bg-charcoal border border-gold/20 p-8 flex flex-col items-center justify-center text-center hover:border-gold/50 hover:bg-[#151000] transition-colors group"
            >
              <span className="font-display text-5xl text-gold mb-3 tracking-tight font-light group-hover:scale-110 transition-transform duration-500">{stat.num}</span>
              <span className="font-heading text-cream uppercase tracking-widest text-xs">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// 6. ZONES CAROUSEL
const zones = [
  { id: "01", name: "ShakesBierre SkyDeck", badge: "✦ OPEN AIR", desc: "Starlit evenings above Brigade Road with craft pours", img: rooftopImg },
  { id: "02", name: "boCHE Dance Floor", badge: "✦ HIGH ENERGY", desc: "Bengaluru's most electric night, every night", img: mainareaImg },
  { id: "03", name: "Private Karaoke Room", badge: "✦ EXCLUSIVE", desc: "Your stage. Your rules. Bookable for groups.", img: ambienceImg },
  { id: "04", name: "Theater Floor", badge: "✦ CURATED", desc: "Live performances, open mics, theatrical dining", img: heroImg },
];

const Zones = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((active + 1) % zones.length);
  const prev = () => setActive((active - 1 + zones.length) % zones.length);

  return (
    <section id="zones" className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient inline-flex items-center gap-6">
            <span className="text-gold text-2xl hidden sm:inline">★</span>
            CHOOSE YOUR VIBE
            <span className="text-gold text-2xl hidden sm:inline">★</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative max-w-[90vw] mx-auto h-[60vh] md:h-[70vh] rounded-none overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black">
              <img src={zones[active].img} alt={zones[active].name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/35 bg-gradient-to-t from-[#080500] via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-heading text-gold text-xl md:text-3xl">{zones[active].id} <span className="text-gold/40 text-sm md:text-lg">/ 04</span></span>
                <span className="bg-charcoal border border-gold/30 px-3 py-1 font-heading text-cream text-[10px] tracking-widest">{zones[active].badge}</span>
              </div>
              <h3 className="font-display text-white mb-4 drop-shadow-2xl text-[clamp(1.4rem,3vw,2.4rem)] tracking-[0.12em] uppercase">{zones[active].name}</h3>
              <p className="font-body italic text-cream/90 text-xl md:text-3xl max-w-2xl">{zones[active].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-black/50 text-gold hover:bg-gold hover:text-black transition-colors backdrop-blur-sm z-20 cursor-pointer">
          <ChevronLeft />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-black/50 text-gold hover:bg-gold hover:text-black transition-colors backdrop-blur-sm z-20 cursor-pointer">
          <ChevronRight />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {zones.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${active === i ? 'bg-gold w-8' : 'bg-gold/30'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

// 7. MENU ZIG-ZAG
const menuItems = [
  { cat: "SIGNATURE BEER", name: "Romeo's Swagger", desc: "A smooth wheat ale brewed for the hopeless romantic", img: drink1 },
  { cat: "SIGNATURE FOOD", name: "Spicy Chicken Tikka", desc: "Fire-kissed skewers with our house mint reduction", img: dish1 },
  { cat: "SIGNATURE BEER", name: "Taming of the Brew", desc: "A wild IPA with a spicy finish, untamed by design", img: drink2 },
  { cat: "SIGNATURE FOOD", name: "Baked Alaska", desc: "A theatrical dessert worth the ovation", img: dish2 },
];

const Menu = () => {
  return (
    <section id="menu" className="py-24 bg-black overflow-hidden">
      <div className="text-center mb-24 px-6">
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mb-4">THE MENU</h2>
        <p className="font-body italic text-gold-pale text-xl md:text-2xl">"Crafted with Drama. Served with Flair."</p>
      </div>

      <div className="flex flex-col w-full">
        {menuItems.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[60vh] group bg-black`}>
              <div className="w-full md:w-1/2 relative overflow-hidden h-[40vh] md:h-auto">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 z-10" />
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                </motion.div>
              </div>
              <div className={`w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 ${isEven ? 'bg-[#0D0900]' : 'bg-black'}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="font-heading text-gold tracking-[0.2em] uppercase text-sm mb-4">{item.cat}</p>
                  <h3 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">{item.name}</h3>
                  <div className="w-12 h-[1px] bg-gold mb-6" />
                  <p className="font-body text-cream/80 text-xl md:text-2xl italic leading-relaxed">{item.desc}</p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// 8. AMENITIES
const Amenities = () => {
  return (
    <section id="amenities" className="py-32 bg-[#080500] relative border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mb-4">THE EXPERIENCE</h2>
          <p className="font-body italic text-gold-pale text-xl md:text-2xl">"Every detail, considered."</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: Car, title: "Complimentary Valet Parking", desc: "Because your entrance should be effortless" },
            { icon: Wifi, title: "High-Speed Free WiFi", desc: "Stay connected. Or don't. We won't judge." },
            { icon: Accessibility, title: "Wheelchair Accessible", desc: "Designed for every guest, without exception" },
            { icon: GlassWater, title: "Club Entry Policy", desc: "Strictly 21+ · Smart Casual Dress Code · Right of Admission Reserved" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-charcoal border-t-2 border-gold p-8 flex items-start gap-6 hover:bg-[#151000] transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-black shrink-0 text-gold">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-xl mb-2">{item.title}</h3>
                <p className="font-body text-cream/70 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="font-heading text-gold tracking-[0.4em] uppercase text-sm flex items-center justify-center gap-4">
            <span>★</span>
            <span className="w-16 md:w-32 h-[1px] bg-gold/30" />
            Dress To Impress
            <span className="w-16 md:w-32 h-[1px] bg-gold/30" />
            <span>★</span>
          </p>
        </div>
      </div>
    </section>
  );
};

// 9. FOOTER
const Footer = () => {
  return (
    <footer id="contact" className="bg-black border-t border-gold pt-24 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16 mb-20">

        {/* Info */}
        <div className="flex flex-col items-start gap-8">
          <div>
            <span className="font-display text-gold-gradient text-3xl md:text-4xl block">ShakesBierre</span>
            <p className="font-heading text-cream text-xs tracking-[0.3em] uppercase mt-2">Brewpub <span className="text-gold mx-2">★</span> Club</p>
          </div>

          <div className="flex flex-col gap-4 font-body text-cream/80 text-lg">
            <p className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
              <span>Levels 4 & 5, EVA Mall,<br />60 Brigade Road, Ashok Nagar,<br />Bengaluru 560025</span>
            </p>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div>
                <p>ShakesBierre: 12:00 PM – 1:00 AM (Daily)</p>
                <p>boCHE Club: 1:00 PM – 1:00 AM (Closed Mondays)</p>
              </div>
            </div>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <span>+91 96069 79931</span>
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-64 border border-gold/40 bg-charcoal flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=12.9716,77.6074&zoom=15&size=600x300&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xd4af37&style=feature:water|color:0x000000&style=feature:landscape|color:0x111111&sensor=false')] opacity-30 bg-cover bg-center grayscale contrast-200" />
          <span className="font-heading text-gold relative z-10 tracking-widest text-sm uppercase flex items-center gap-2 group-hover:scale-105 transition-transform"><MapPin className="w-4 h-4" /> View on Map</span>
        </div>

        {/* Social */}
        <div className="flex flex-col items-start lg:items-end gap-6">
          <h3 className="font-heading text-gold tracking-[0.2em] uppercase">Follow The Drama</h3>
          <div className="flex flex-col gap-4 text-right">
            <a href="#" className="font-body text-cream text-xl hover:text-gold hover:text-neon-glow transition-all flex items-center justify-end gap-3 group">
              <span className="hidden lg:inline">@boche.shakesbierre</span> <Instagram className="w-5 h-5 group-hover:text-red-neon transition-colors" />
            </a>
            <a href="#" className="font-body text-cream text-xl hover:text-gold hover:text-neon-glow transition-all flex items-center justify-end gap-3 group">
              <span className="hidden lg:inline">@bocheclub</span> <Instagram className="w-5 h-5 group-hover:text-red-neon transition-colors" />
            </a>
            <a href="#" className="font-body text-cream text-xl hover:text-gold transition-all flex items-center justify-end gap-3 group">
              <span className="hidden lg:inline">ShakesBierre</span> <Facebook className="w-5 h-5 group-hover:text-[#1877F2] transition-colors" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center">
        <p className="font-heading text-gold/40 text-xs tracking-widest uppercase">
          © 2026 ShakesBierre Brewpub & Club · Crafted in Bengaluru
        </p>
      </div>
    </footer>
  );
};

// ----------------- MAIN LAYOUT -----------------

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Don't render on small screens/touch devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 2 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-gold/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(255, 215, 0, 0.8)' : 'rgba(201, 148, 42, 0.5)'
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />
    </>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide scrollbar during curtain reveal
    document.body.style.overflow = loading ? 'hidden' : 'auto';

    const timer = setTimeout(() => setLoading(false), 0);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  return (
    <div className="bg-black min-h-screen text-cream overflow-x-hidden selection:bg-gold selection:text-black font-body">
      <AnimatePresence mode="wait">
        {loading && <CurtainReveal key="curtain" />}
      </AnimatePresence>

      <div className={loading ? "opacity-0 h-screen overflow-hidden" : "opacity-100 transition-opacity duration-1000 snap-scroll"}>
        <CustomCursor />
        <Navbar />
        <ParticleBackground />

        <main className="relative z-10">
          <Hero />
          <ActDivider act="ACT I" title="The Venue" />
          <About />
          <ActDivider act="ACT II" title="The Craft" />
          <BeerShowcase />
          <ActDivider act="ACT III" title="The Worlds" />
          <Zones />
          <ActDivider act="ACT IV" title="The Menu" />
          <Menu />
          <ActDivider act="ACT V" title="The Experience" />
          <Amenities />
        </main>

        <Footer />
      </div>
    </div>
  );
}
