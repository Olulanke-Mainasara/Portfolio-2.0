import { motion } from "framer-motion";
import "./splash.css";
const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "none",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#424141",
  },
  halfVisible: {
    opacity: 1,
    pathLength: 1,
  },
};

export const Splash = () => (
  <>
    <motion.div
      className="absolute bg-black h-full z-20 inset-0"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, display: "none" }}
      transition={{
        default: { delay: 3, duration: 1 },
        display: { delay: 3.7 },
      }}
    ></motion.div>

    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, display: "none" }}
      transition={{ default: { delay: 2.5 }, display: { delay: 3.7 } }}
      className="absolute inset-0 flex items-center justify-center z-20"
    >
      <div className="container xl:scale-150">
        <motion.svg
          className="item left-arrow"
          viewBox="0 0 39 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M35.2812 53L3.71875 28L35.2813 3"
            variants={icon}
            initial="hidden"
            animate="halfVisible"
            transition={{
              default: { duration: 1.5, ease: "easeInOut" },
            }}
          />
        </motion.svg>

        <motion.svg
          className="item"
          viewBox="0 0 82 86"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M33.9685 64.9631C33.9687 64.9337 33.9688 64.9044 33.9688 64.875C33.9688 63.2132 33.6737 61.627 33.1379 60.1765C31.448 55.6014 27.3638 52.375 22.5938 52.375C16.3116 52.375 11.2188 57.9714 11.2188 64.875C11.2188 70.0527 7.39915 74.25 2.68747 74.25C2.49525 74.25 2.30452 74.243 2.11548 74.2293C5.06297 79.8451 10.5829 83.625 16.9062 83.625C26.3028 83.625 33.9254 75.2779 33.9685 64.9631Z"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 1.5, ease: "easeInOut" },
            }}
          />
          <motion.path
            d="M33.1379 60.1765C31.448 55.6014 27.3638 52.375 22.5938 52.375C16.3116 52.375 11.2188 57.9714 11.2188 64.875C11.2188 70.0527 7.39915 74.25 2.68747 74.25C2.49525 74.25 2.30452 74.243 2.11548 74.2293C5.06297 79.8451 10.5829 83.625 16.9062 83.625C26.3028 83.625 33.9254 75.2779 33.9685 64.9631C33.9687 64.9337 33.9688 64.9044 33.9688 64.875C33.9688 63.2132 33.6737 61.627 33.1379 60.1765ZM33.1379 60.1765C37.6664 58.4806 41.9737 56.2102 45.9789 53.4282M26.8594 53.3203C28.4038 48.3322 30.4733 43.5879 33.0104 39.1772M45.9789 53.4282C53.109 48.4754 59.2815 41.9008 64.0391 34.0586L78.7356 9.8336C79.2137 9.04553 79.4688 8.11959 79.4688 7.17245C79.4688 4.52289 77.5142 2.375 75.1031 2.375C74.2412 2.375 73.3986 2.65536 72.6815 3.18073L50.6368 19.3307C43.5003 24.5589 37.5175 31.3418 33.0104 39.1772M45.9789 53.4282C43.4086 47.097 38.7718 42.0016 33.0104 39.1772"
            variants={icon}
            initial="hidden"
            animate="halfVisible"
            transition={{
              default: { duration: 1.5, ease: "easeInOut" },
            }}
          />
        </motion.svg>

        <motion.svg
          className="item right-arrow"
          viewBox="0 0 38 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M3.0625 3L34.9375 28L3.0625 53"
            variants={icon}
            initial="hidden"
            animate="halfVisible"
            transition={{
              default: { duration: 1.5, ease: "easeInOut" },
            }}
          />
        </motion.svg>
      </div>
    </motion.div>
  </>
);
