import { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { motion, useInView, animate } from "framer-motion";
import type { Variants } from "framer-motion"; // <-- The magic fix for TypeScript

import aboutUs from "../assets/AboutUs.png";

// --- STRICT TYPES FOR COUNTER ---
interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

// --- UPGRADED FRAMER MOTION COUNTER ---
const AnimatedCounter = ({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  // Triggers when the counter comes into view
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: duration,
        ease: "easeOut", // Smooth deceleration
        onUpdate(val) {
          setValue(Math.floor(val));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration]);

  return (
    <Typography
      variant="h3"
      component="span"
      sx={{ fontWeight: 800, color: "#000000", mb: 1, display: "inline-block" }}
    >
      <span ref={ref}>
        {prefix}
        {value}
        {suffix}
      </span>
    </Typography>
  );
};

// --- STRICTLY TYPED FRAMER MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cascades the children animations
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.8, 0.25, 1], // Smooth custom easing
    },
  },
};

const AboutUs = () => {
  return (
    <Box
      id="about"
      sx={{
        backgroundColor: "#deffcd",
        color: "#000000",
        py: { xs: 6, md: 10 },
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* --- TOP ROW --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mb: 5,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ fontWeight: 400, textTransform: "uppercase" }}
                >
                  Welcome to <br />
                  <Box
                    component="span"
                    sx={{
                      fontFamily: '"Oranienbaum"',
                      fontWeight: 400,
                      textTransform: "capitalize",
                    }}
                  >
                    Hiland Realty
                  </Box>
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.8 }}
                >
                  Hiland Realty is a premier Real estate developer in Southern
                  India specializing in luxury gated farmlands and high-valued
                  residential communities
                  <strong> “Bounded by Trust”</strong>. Creating assets that
                  deliver both lifestyle satisfaction and financial growth.
                  Built on transparency, trust, and a commitment to long-term
                  value creation.
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </motion.div>

        {/* --- MIDDLE ROW (STATS) --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              py: 4,
              mb: 6,
              borderTop: "1px solid #c0e0b0",
              borderBottom: "1px solid #c0e0b0",
              gap: { xs: 3, md: 0 },
            }}
          >
            {/* Stat 1 */}
            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <AnimatedCounter end={500} suffix="+" />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Delightful Customers
                </Typography>
              </motion.div>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                borderColor: "#c0e0b0",
              }}
            />

            {/* Stat 2 */}
            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <AnimatedCounter end={30} prefix="$" suffix=" M" />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Net Worth
                </Typography>
              </motion.div>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                borderColor: "#c0e0b0",
              }}
            />

            {/* Stat 3 */}
            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <AnimatedCounter end={50} suffix="+" />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Employees
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </motion.div>

        {/* --- BOTTOM ROW (MISSION & IMAGE) --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Left Text */}
            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  Our mission and vision
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3 }}
                >
                  To develop nature-integrated communities that provide serene
                  living experiences with long-term wealth creation. Focused on
                  building sustainable communities that grow in value over time.
                  Driven by a vision to combine nature, trust, and smart
                  investment opportunities.
                </Typography>
              </motion.div>

              {/* Custom Premium Bullet List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {[
                  "Identify and develop high-potential growth corridors",
                  "Maintain complete transparency in every transaction",
                  "Deliver quality infrastructure and planning",
                  "Create sustainable, low-density communities",
                  "Build long-term customer trust",
                ].map((point, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#385A01",
                          fontWeight: 900,
                          fontSize: "1.2rem",
                          lineHeight: 1.2,
                        }}
                      >
                        •
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        {point}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Right Image with Parallax Reveal */}
            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <motion.div variants={imageVariants} style={{ width: "80%" }}>
                <Box
                  component="img"
                  src={aboutUs}
                  alt="Hiland Realty Mission"
                  sx={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                    borderRadius: "32px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)", // Slightly deeper shadow
                  }}
                />
              </motion.div>
            </Box>
          </Box>
        </motion.div>

        {/* --- FOURTH ROW (WHY CHOOSE US) --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" }, // <-- Added this line for vertical centering
              gap: 4,
              mt: 8,
              pt: 6,
              borderTop: "1px solid #c0e0b0",
            }}
          >
            {/* Left Side: Heading */}
            <Box sx={{ flex: 1 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ fontWeight: 400, textTransform: "capitalize" }}
                >
                  Why choose <br />
                  <Box
                    component="span"
                    sx={{ fontFamily: '"Oranienbaum"', fontWeight: 400 }}
                  >
                    Hiland Realty?
                  </Box>
                </Typography>
              </motion.div>
            </Box>

            {/* Right Side: Paragraph & Bullet Points */}
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                  }}
                >
                  With over a decade of experience, Hiland Realty stands as a
                  trusted name in delivering high-value real estate investments.
                </Typography>
              </motion.div>

              {/* Consistent Custom Bullet Points */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {[
                  "Established in 2009 with a proven track record in real estate development",
                  "Expertise in identifying high-growth corridors with strong appreciation potential",
                  "Nature-first planning combined with strategic investment insights",
                  "Focused on delivering long-term value and consistent returns",
                  "Transparent processes built on trust and reliability",
                  "Developments designed for both lifestyle excellence and financial growth",
                ].map((point, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#385A01",
                          fontWeight: 900,
                          fontSize: "1.2rem",
                          lineHeight: 1.2,
                        }}
                      >
                        •
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        {point}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutUs;

// import { useState, useEffect, useRef } from "react";
// import { Box, Typography, Container, Divider } from "@mui/material";
// import { keyframes } from "@mui/system";

// import aboutUs from "../assets/AboutUs.png";

// // --- ANIMATIONS ---
// const slideUpFade = keyframes`
//   0% { opacity: 0; transform: translateY(40px); }
//   100% { opacity: 1; transform: translateY(0); }
// `;

// // --- TYPESCRIPT INTERFACES ---
// interface AnimatedCounterProps {
//   end: number;
//   prefix?: string;
//   suffix?: string;
//   duration?: number;
//   start: boolean;
// }

// // --- CUSTOM COUNT-UP COMPONENT ---
// const AnimatedCounter = ({
//   end,
//   prefix = "",
//   suffix = "",
//   duration = 2000,
//   start,
// }: AnimatedCounterProps) => {
//   const [count, setCount] = useState<number>(0);

//   useEffect(() => {
//     if (!start) return;

//     let startTime: number | null = null;
//     let animationFrameId: number;

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);

//       // An easing function so it slows down elegantly near the end
//       const easeOut = 1 - Math.pow(1 - progress, 4);
//       setCount(Math.floor(easeOut * end));

//       if (progress < 1) {
//         animationFrameId = window.requestAnimationFrame(animate);
//       }
//     };

//     animationFrameId = window.requestAnimationFrame(animate);

//     // Cleanup function
//     return () => window.cancelAnimationFrame(animationFrameId);
//   }, [end, duration, start]);

//   return (
//     <Typography variant="h3" sx={{ fontWeight: 800, color: "#000000", mb: 1 }}>
//       {prefix}
//       {count}
//       {suffix}
//     </Typography>
//   );
// };

// const AboutUs = () => {
//   // State to track if the section is visible on screen
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   // Setup the Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.2 },
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <Box
//       id="about"
//       ref={sectionRef}
//       sx={{
//         backgroundColor: "#deffcd",
//         color: "#000000",
//         py: { xs: 6, md: 10 },
//         minHeight: "100dvh",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* TOP ROW */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 3,
//             mb: 5,
//             opacity: isVisible ? 1 : 0,
//             animation: isVisible
//               ? `${slideUpFade} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`
//               : "none",
//             animationDelay: "0.1s",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{ fontWeight: 400, textTransform: "uppercase" }}
//             >
//               Welcome to <br />
//               <Box
//                 component="span"
//                 sx={{
//                   fontFamily: '"Oranienbaum"',
//                   fontWeight: 400,
//                   textTransform: "capitalize",
//                 }}
//               >
//                 Hiland Realty
//               </Box>
//             </Typography>
//           </Box>
//           <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
//             <Typography
//               variant="body1"
//               sx={{ color: "text.secondary", lineHeight: 1.8 }}
//             >
//               Hiland Realty is a premier Real estate developer in Southern India
//               specializing in luxury gated farmlands and high-valued residential
//               communities
//               <strong> “Bounded by Trust”</strong>.
//             </Typography>
//           </Box>
//         </Box>

//         {/* MIDDLE ROW */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             justifyContent: "space-between",
//             alignItems: "center",
//             textAlign: "center",
//             py: 4,
//             mb: 6,
//             borderTop: "1px solid #c0e0b0",
//             borderBottom: "1px solid #c0e0b0",
//             gap: { xs: 3, md: 0 },
//             // --- ANIMATION ---
//             opacity: isVisible ? 1 : 0,
//             animation: isVisible
//               ? `${slideUpFade} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`
//               : "none",
//             animationDelay: "0.3s",
//           }}
//         >
//           {/* Stat 1 */}
//           <Box sx={{ flex: 1 }}>
//             <AnimatedCounter start={isVisible} end={500} suffix="+" />
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 color: "text.secondary",
//                 fontWeight: 600,
//                 textTransform: "uppercase",
//               }}
//             >
//               Delightful Customers
//             </Typography>
//           </Box>

//           <Divider
//             orientation="vertical"
//             flexItem
//             sx={{
//               display: { xs: "none", md: "block" },
//               borderColor: "#c0e0b0",
//             }}
//           />

//           {/* Stat 2 */}
//           <Box sx={{ flex: 1 }}>
//             <AnimatedCounter
//               start={isVisible}
//               end={30}
//               prefix="$"
//               suffix=" M"
//             />
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 color: "text.secondary",
//                 fontWeight: 600,
//                 textTransform: "uppercase",
//               }}
//             >
//               Net Worth
//             </Typography>
//           </Box>

//           <Divider
//             orientation="vertical"
//             flexItem
//             sx={{
//               display: { xs: "none", md: "block" },
//               borderColor: "#c0e0b0",
//             }}
//           />

//           {/* Stat 3 */}
//           <Box sx={{ flex: 1 }}>
//             <AnimatedCounter start={isVisible} end={50} suffix="+" />
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 color: "text.secondary",
//                 fontWeight: 600,
//                 textTransform: "uppercase",
//               }}
//             >
//               Employees
//             </Typography>
//           </Box>
//         </Box>

//         {/* BOTTOM ROW : */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             gap: 4,
//             // --- ANIMATION ---
//             opacity: isVisible ? 1 : 0,
//             animation: isVisible
//               ? `${slideUpFade} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`
//               : "none",
//             animationDelay: "0.5s",
//           }}
//         >
//           {/* Left Text */}
//           <Box sx={{ flex: 1 }}>
//             <Typography
//               variant="h4"
//               component="h3"
//               sx={{ fontWeight: 600, mb: 3 }}
//             >
//               Our mission and vision
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3 }}
//             >
//               To develop nature-integrated communities that provide serene
//               living experiences with long-term wealth creation.
//             </Typography>

//             {/* Custom Premium Bullet List */}
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//               {[
//                 "Identify and develop high-potential growth corridors",
//                 "Maintain complete transparency in every transaction",
//                 "Deliver quality infrastructure and planning",
//                 "Create sustainable, low-density communities",
//                 "Build long-term customer trust",
//               ].map((point, index) => (
//                 <Box
//                   key={index}
//                   sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
//                 >
//                   <Typography
//                     sx={{
//                       color: "text.secondary",
//                       fontWeight: 900,
//                       fontSize: "1.2rem",
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     •
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{ color: "text.secondary", lineHeight: 1.6 }}
//                   >
//                     {point}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>

//           {/* Right Image */}
//           <Box
//             sx={{
//               flex: 1,
//               width: "100%",
//               display: "flex",
//               justifyContent: "flex-end",
//             }}
//           >
//             <Box
//               component="img"
//               src={aboutUs}
//               alt="Hiland Realty Mission"
//               sx={{
//                 width: "80%",
//                 height: "450px",
//                 objectFit: "cover",
//                 borderRadius: "32px",
//                 boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//               }}
//             />
//           </Box>
//         </Box>

//         {/* FOURTH ROW */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 4,
//             mt: 8,
//             pt: 6,
//             borderTop: "1px solid #c0e0b0",
//             // --- ANIMATION ---
//             opacity: isVisible ? 1 : 0,
//             animation: isVisible
//               ? `${slideUpFade} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`
//               : "none",
//             animationDelay: "0.7s",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{ fontWeight: 400, textTransform: "capitalize" }}
//             >
//               Why choose <br />
//               <Box
//                 component="span"
//                 sx={{
//                   fontFamily: '"Oranienbaum"',
//                   fontWeight: 400,
//                 }}
//               >
//                 Hiland Realty?
//               </Box>
//             </Typography>
//           </Box>

//           <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 lineHeight: 1.8,
//                 fontSize: "1.1rem",
//               }}
//             >
//               We blend nature-first design with smart investment thinking to
//               create communities that truly grow over time. With customer trust
//               at our core, we deliver developments built for both lifestyle and
//               long-term returns.
//             </Typography>
//           </Box>
//         </Box>

//         {/* FOURTH ROW */}
//         {/* <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 4,
//             mt: 8,
//             pt: 6,
//             borderTop: "1px solid #c0e0b0",
//             // --- ANIMATION ---
//             opacity: isVisible ? 1 : 0,
//             animation: isVisible
//               ? `${slideUpFade} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`
//               : "none",
//             animationDelay: "0.7s",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Typography
//               variant="h3"
//               component="h2"
//               sx={{ fontWeight: 400, textTransform: "capitalize" }}
//             >
//               Why choose <br />
//               <Box
//                 component="span"
//                 sx={{
//                   fontFamily: '"Oranienbaum"',
//                   fontWeight: 400,
//                 }}
//               >
//                 Hiland Realty?
//               </Box>
//             </Typography>
//           </Box>

//           <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 lineHeight: 1.8,
//                 fontSize: "1.1rem",
//                 mb: 4, // Added margin to separate the paragraph from the list
//               }}
//             >
//               We blend nature-first design with smart investment thinking to
//               create communities that truly grow over time. With customer trust
//               at our core, we deliver developments built for both lifestyle and
//               long-term returns.
//             </Typography>

//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // 1 column on mobile, 2 columns on larger screens
//                 gap: 3,
//               }}
//             >
//               {[
//                 { icon: "🌿", text: "Nature-Rich Locations in Growth Corridors" },
//                 { icon: "🤝", text: "Customer-First Guidance Always" },
//                 { icon: "📈", text: "Investment-Friendly Pricing Strategy" },
//                 { icon: "✅", text: "Transparent and Smooth Paperwork" },
//               ].map((feature, index) => (
//                 <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       width: 44,
//                       height: 44,
//                       borderRadius: "50%",
//                       backgroundColor: "#ffffff",
//                       boxShadow: "0 6px 16px rgba(0,0,0,0.08)", // Soft floating shadow
//                       flexShrink: 0,
//                       fontSize: "1.2rem",
//                     }}
//                   >
//                     {feature.icon}
//                   </Box>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: 700,
//                       color: "text.primary",
//                       lineHeight: 1.4,
//                       fontSize: "0.95rem"
//                     }}
//                   >
//                     {feature.text}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Box> */}
//       </Container>
//     </Box>
//   );
// };

// export default AboutUs;
