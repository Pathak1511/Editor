import React from "react";
import { motion } from "framer-motion";

const FuzzyOverlayError = ({ changeTab, error }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <ExampleContent changeTab={changeTab} error={error} />
      <FuzzyOverlay />
    </div>
  );
};

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: 'url("/assests/black-noise.png")',
        //backgroundImage: 'url("/assests/noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};

const ExampleContent = ({ changeTab, error, navigate }) => {
  return (
    <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-8">
      <p className="text-center text-6xl font-black text-neutral-50">
        Error 404
      </p>
      <p className="text-center text-neutral-400">
        This route is not defined yet 📺
      </p>
      <div className="flex items-center justify-center gap-3">
        {error ? (
          <></>
        ) : (
          <button
            className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            onClick={() => changeTab("dashboard")}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default FuzzyOverlayError;
