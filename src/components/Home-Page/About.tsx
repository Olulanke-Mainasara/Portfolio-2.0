import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const HeroH1 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="absolute top-0 h-[200dvh] w-full text-white">
      <div className="sticky top-0 flex flex-col items-center justify-center w-full h-screen -z-10">
        <div>
          <p className="text-xl tracking-widest text-center uppercase md:text-3xl">
            Frontend Engineer
          </p>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
            className="text-6xl md:text-9xl xl:text-[200px] uppercase flex flex-col items-center leading-none xl:block relative"
          >
            <span className="xl:hidden">Olulanke</span>Mainasara
            <motion.p
              style={{ opacity: scrollYProgress }}
              className="text-6xl md:text-9xl xl:text-[200px] uppercase flex flex-col items-center leading-none xl:block bg-[url('/space-lighthouse.png')] bg-bottom bg-cover bg-clip-text text-transparent absolute inset-0"
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center", "end end"],
  });

  return (
    <>
      <HeroH1 />
      <div ref={ref} className="absolute top-0 h-[200dvh] w-full text-white">
        <div className="sticky top-0 flex flex-col items-center w-full h-screen justify-evenly">
          <motion.div
            style={{ opacity: scrollYProgress }}
            className="flex items-center justify-end w-full p-4 md:pr-8"
          >
            <p className="max-w-md text-3xl font-thin text-right">
              Hey, I'm Mainasara Olulanke, Frontend Engineer by day, Capt. Space
              Rockstar by night.
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
            className="flex flex-col items-center justify-between w-full p-4 md:flex-row md:pl-8"
          >
            <p className="max-w-md text-3xl font-thin">
              I build creative solutions for the web that are performant and
              scalable, and having fun while doing it.
            </p>

            {children}
          </motion.div>
        </div>
      </div>
      <div className="relative h-[60dvh] lg:h-screen p-4 pb-0 md:p-8">
        <motion.img
          style={{ opacity: scrollYProgress }}
          src="/me.jpg"
          className="object-cover object-top w-full h-full rounded-lg brightness-[30%]"
          alt="Mainasara Olulanke"
        />
        <div className="absolute inset-0 flex flex-col text-white items-center justify-center w-full h-full rounded-lg">
          <p className="text-center md:text-2xl text-neutral-400">
            Going by this,
          </p>
          <p className="max-w-xl lg:max-w-3xl p-8 text-xl font-thin text-center md:text-2xl lg:text-4xl">
            "Any fool can write code that a computer can understand. Good
            programmers write code that humans can understand." - Martin Fowler,
          </p>
          <p className="text-center md:text-2xl text-neutral-400">
            I'm a 10x developer (testing is for losers🫵🏾).
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
