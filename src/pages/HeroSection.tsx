import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { keyframes } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// IMPORT YOUR VIDEOS HERE
import vid1 from "../assets/hero_video_1.mp4";
import vid2 from "../assets/hero_video_2.mp4";
import vid3 from "../assets/hero_video_3.mp4";

const videos = [vid1, vid2, vid3];

// UPDATED CONTENT HERE
const heroContent = [
  {
    line1: "Redefining Real Estate",
    line2: "with Elegance and Calm.",
    subtitle: "Where luxury meets long-term value. Dive into a world of comfort and convenience as we connect you with nature and luxury.",
  },
  {
    line1: "Discover Exceptional",
    line2: "Living Spaces.",
    subtitle: "Designed for life. Built for growth. Experience architectural brilliance tailored to your modern lifestyle and aspirations.",
  },
  {
    line1: "Invest in Tomorrow’s",
    line2: "Premium Landscapes.",
    subtitle: "Smarter investments. Stronger returns. Secure your future with high-value properties in the most sought-after growth corridors.",
  },
];

const liquidAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- STATIC ELEMENTS VARIANTS (Buttons, Widget) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const premiumEase:any = [0.16, 1, 0.3, 1];

const dynamicTextVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.95, 
    filter: "blur(10px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: premiumEase } 
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    scale: 1.05, 
    filter: "blur(10px)",
    transition: { duration: 0.6, ease: "easeInOut" } 
  }
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 6000); // Cycles every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* BACKGROUND VIDEOS */}
      {videos.map((vid, index) => (
        <motion.video
          key={index}
          src={vid}
          autoPlay
          muted
          loop
          playsInline
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.1,
          }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 6, ease: "linear" },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* DARK OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 2,
        }}
      />

      {/* ANIMATED STATIC CONTENT WRAPPER (Buttons & Widget) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: "absolute", inset: 0, zIndex: 3 }}
      >
        {/* CENTERED DYNAMIC HERO TEXT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
            textAlign: "center",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* AnimatePresence handles the exit/enter of the changing text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex} // Changing the key forces Framer Motion to animate it
              variants={dynamicTextVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  maxWidth: "900px",
                  textShadow: "0px 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {heroContent[currentIndex].line1}
              </Typography>

              <Typography
                variant="h2"
                component="span"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontFamily: '"Oranienbaum", serif',
                  color: "#deffcd",
                  textShadow: "0px 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {heroContent[currentIndex].line2}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: "600px",
                  fontWeight: 300,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  textShadow: "0px 4px 10px rgba(0,0,0,0.5)",
                }}
              >
                {heroContent[currentIndex].subtitle}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* BOTTOM LEFT BUTTONS */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 30, md: 50 },
            left: { xs: 20, md: 50 },
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {["Architecture", "House", "Commercial"].map((label) => (
            <motion.div key={label} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "30px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  backdropFilter: "blur(8px)",
                  "& hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "white",
                  },
                }}
              >
                {label}
              </Button>
            </motion.div>
          ))}
        </Box>

        {/* BOTTOM RIGHT WIDGET */}
        <Box sx={{ position: "absolute", bottom: { xs: 100, md: 50 }, right: { xs: 20, md: 50 }, zIndex: 4 }}>
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                width: 240,
                p: 2,
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                overflow: "hidden",
                background: "linear-gradient(270deg, rgba(0, 153, 255, 0.2), rgba(0, 204, 255, 0.4), rgba(0, 153, 255, 0.2))",
                backgroundSize: "400% 400%",
                animation: `${liquidAnimation} 8s ease-in-out infinite`,
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 10px 40px 0 rgba(0, 0, 0, 0.4)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                  }}
                >
                  <HomeIcon sx={{ color: "black", fontSize: "1.2rem" }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 700, lineHeight: 1.2 }}>
                  Evergreen Heaven
                </Typography>
              </Box>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ alignSelf: "center", marginTop: "8px" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    boxShadow: "none",
                    "& hover": {
                      backgroundColor: "#f0f0f0",
                      boxShadow: "0px 4px 15px rgba(255,255,255,0.3)",
                    },
                  }}
                  onClick={() => navigate("/ongoingproject")}
                >
                  Learn More
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroSection;


// import { useState, useEffect } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { keyframes } from "@mui/system";
// import HomeIcon from "@mui/icons-material/Home";

// // IMPORT YOUR VIDEOS HERE (Update the filenames to match your assets)
// import vid1 from "../assets/hero_video_1.mp4";
// import vid2 from "../assets/hero_video_2.mp4";
// import vid3 from "../assets/hero_video_3.mp4";
// import { useNavigate } from "react-router-dom";

// const videos = [vid1, vid2, vid3];

// // Define the liquid animation outside the component
// const liquidAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const fadeInUp = keyframes`
//   0% {
//     opacity: 0;
//     transform: translateY(40px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const HeroSection = () => {
//   const navigate = useNavigate()
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
//     }, 6000); // Changes video every 6 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         width: "100%",
//         height: "100dvh",
//         overflow: "hidden",
//         backgroundColor: "#000",
//       }}
//     >
//       {/* --- BACKGROUND VIDEOS --- */}
//       {videos.map((vid, index) => (
//         <Box
//           key={index}
//           component="video"
//           src={vid}
//           autoPlay
//           muted
//           loop
//           playsInline // Critical for iOS autoplay
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover", // Ensures the video fills the screen without stretching
//             opacity: index === currentIndex ? 1 : 0,
//             transition: "opacity 1.5s ease-in-out",
//             zIndex: index === currentIndex ? 1 : 0,
//           }}
//         />
//       ))}

//       {/* DARK OVERLAY */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.3)",
//           zIndex: 2,
//         }}
//       />

//       {/* CENTERED HERO TEXT */}
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 3,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100%",
//           color: "white",
//           textAlign: "center",
//           px: { xs: 2, md: 4 },
//         }}
//       >
//         <Typography
//           variant="h2"
//           component="h1"
//           sx={{
//             fontWeight: 800,
//             mb: 2,
//             fontSize: { xs: "2.5rem", md: "4rem" },
//             maxWidth: "900px",
//             opacity: 0,
//             animation: `${fadeInUp} 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`,
//             animationDelay: "0.2s",
//           }}
//         >
//           Redefining Real Estate with Elegance and calm.
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             mb: 4,
//             maxWidth: "600px",
//             fontWeight: 200,
//             opacity: 0,
//             animation: `${fadeInUp} 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`,
//             animationDelay: "0.6s",
//           }}
//         >
//           Dive into a world of comfort and convenience as we connect you with
//           nature and luxury
//         </Typography>
//       </Box>

//       {/* BOTTOM LEFT BUTTONS */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: { xs: 30, md: 50 },
//           left: { xs: 20, md: 50 },
//           zIndex: 3,
//           display: "flex",
//           gap: 2,
//           flexWrap: "wrap",
//         }}
//       >
//         {["Architecture", "House", "Commercial"].map((label, index) => (
//           <Button
//             key={label}
//             variant="outlined"
//             size="small"
//             sx={{
//               color: "white",
//               borderColor: "rgba(255, 255, 255, 0.5)",
//               borderRadius: "20px",
//               px: 3,
//               textTransform: "none",
//               backdropFilter: "blur(4px)",
//               "&:hover": {
//                 borderColor: "white",
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//               },
//               opacity: 0,
//               animation: `${fadeInUp} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`,
//               animationDelay: `${0.8 + index * 0.2}s`,
//             }}
//           >
//             {label}
//           </Button>
//         ))}
//       </Box>

//       {/* BOTTOM RIGHT WIDGET */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: { xs: 100, md: 50 },
//           right: { xs: 20, md: 50 },
//           zIndex: 3,
//           width: 240,
//           p: 2,
//           borderRadius: "20px",
//           display: "flex",
//           flexDirection: "column",
//           gap: 1.5,
//           overflow: "hidden",
//           background:
//             "linear-gradient(270deg, rgba(0, 153, 255, 0.2), rgba(0, 204, 255, 0.4), rgba(0, 153, 255, 0.2))",
//           backgroundSize: "400% 400%",
//           animation: `${liquidAnimation} 8s ease-in-out infinite`,
//           backdropFilter: "blur(12px)",
//           border: "1px solid rgba(255, 255, 255, 0.3)",
//           boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "white",
//               borderRadius: "50%",
//               width: 36,
//               height: 36,
//             }}
//           >
//             <HomeIcon sx={{ color: "black", fontSize: "1.2rem" }} />
//           </Box>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               color: "white",
//               fontWeight: 700,
//               lineHeight: 1.2,
//             }}
//           >
//             Evergreen Heaven
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           size="small"
//           sx={{
//             backgroundColor: "white",
//             color: "black",
//             borderRadius: "30px",
//             textTransform: "none",
//             fontWeight: 600,
//             alignSelf: "center",
//             px: 3,
//             py: 1,
//             mt: 1,
//             boxShadow: "none",
//             "&:hover": {
//               backgroundColor: "#f0f0f0",
//               boxShadow: "none",
//             },
//           }}
//           onClick={()=>navigate('/ongoingproject')}
//         >
//           Learn More
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default HeroSection;