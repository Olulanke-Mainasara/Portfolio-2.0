import { useRef, useEffect } from "react";
import { motion, useScroll, animate, stagger, useInView } from "framer-motion";
import { splitText } from "motion-plus";

const HeroH1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={ref}
      className="absolute top-0 md:min-h-384 h-[200vh] w-full text-white"
    >
      <div className="sticky top-0 flex flex-col items-center justify-center w-full md:min-h-192 h-screen -z-10">
        <div>
          <p className="text-xl tracking-widest text-center uppercase md:text-3xl">
            Frontend Engineer
          </p>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ease: "easeInOut",
              delay: 3.2,
              type: "spring",
            }}
            className="text-6xl md:text-9xl xl:text-[200px] uppercase flex flex-col items-center leading-none xl:block relative"
          >
            <span className="xl:hidden">Olulanke</span>Mainasara
            <motion.p
              style={{ opacity: scrollYProgress }}
              className="text-6xl md:text-9xl xl:text-[200px] uppercase flex flex-col items-center leading-none xl:block bg-[url('/space-lighthouse.webp')] bg-bottom bg-cover bg-clip-text text-transparent absolute inset-0"
            >
              <span className="xl:hidden">Olulanke</span>Mainasara
            </motion.p>
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

const About = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(textRef, { once: true }); // Trigger animation only once when in view

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center", "end end"],
  });

  useEffect(() => {
    if (!isInView || !textRef.current) return;

    // Animation code
    const { lines } = splitText(textRef.current);

    // Cover each line with a curtain that shrinks away to reveal the text
    const curtains = lines.map((line) => {
      line.style.position = "relative";
      line.style.overflow = "hidden";

      const curtain = document.createElement("span");
      curtain.style.position = "absolute";
      curtain.style.inset = "0";
      curtain.style.background = "var(--color-background)";
      curtain.style.transformOrigin = "right center";
      line.appendChild(curtain);

      return curtain;
    });

    // Set parent back to full opacity since we're animating children
    textRef.current.style.opacity = "1";

    animate(
      curtains,
      { scaleX: [1, 0] },
      {
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
        delay: stagger(0.15),
      },
    );
  }, [isInView]);

  return (
    <>
      <HeroH1 />
      <div
        ref={ref}
        className="absolute top-0 md:min-h-384 h-[200vh] w-full text-white"
      >
        <div className="sticky top-0 flex flex-col items-center w-full md:min-h-192 h-screen justify-evenly max-w-screen-2xl mx-auto">
          <motion.div
            style={{ opacity: scrollYProgress }}
            className="flex items-center justify-end w-full p-4 lg:px-8"
          >
            <p className="max-w-md text-3xl font-thin text-right">
              Hey, I'm Mainasara Olulanke, Frontend Engineer by day, aspiring
              astronaut by night.
            </p>
          </motion.div>

          <div>
            <motion.p
              style={{ opacity: scrollYProgress }}
              className="text-xl font-thin tracking-widest text-center text-transparent uppercase md:text-3xl"
            >
              Frontend Engineer
            </motion.p>
            <h1 className="text-6xl md:text-9xl xl:text-[200px] uppercase flex flex-col items-center leading-none xl:block relative text-transparent">
              <span className="xl:hidden">Olulanke</span>Mainasara
            </h1>
          </div>

          <motion.div
            style={{ opacity: scrollYProgress }}
            className="flex flex-col items-center justify-between w-full p-4 md:flex-row lg:px-8"
          >
            <p className="max-w-md text-3xl font-thin">
              I build fast, intelligent, and creative solutions for the web, and
              I have a lot of fun doing it.{" "}
              <span className="font-bold">Hire me</span>.
            </p>

            {children}
          </motion.div>
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row md:items-center gap-4 lg:gap-8 xl:gap-10 xl:min-h-125 xl:h-[80vh] px-4 lg:px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <img
          src="/me.webp"
          className="object-cover object-top w-full md:w-1/2 xl:w-full h-full rounded-lg xl:brightness-80 [@media(hover:hover)]:grayscale hover:grayscale-0 duration-300"
          alt="Mainasara Olulanke"
        />
        <div className="flex flex-col justify-center gap-2 text-white xl:pr-4 xl:w-4/5">
          <h3
            ref={textRef}
            className="max-w-xl lg:max-w-3xl text-xl font-thin lg:text-3xl xl:text-4xl opacity-0 xl:leading-12"
          >
            I've spent 3+ years building production web apps for real clients,
            led frontend at AfriTransfer, and got my hands dirty with both code
            and infrastructure at CWG PLC. I've also taught a cohort of junior
            developers how to stop fearing the terminal, a BIG W for me.
          </h3>
        </div>
      </div>
    </>
  );
};

export default About;
