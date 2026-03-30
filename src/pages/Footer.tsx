import { useRef } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

import footerBg from "../assets/footer_img.png";

// --- STAGGERED REVEAL FOR THE GREEN FORM ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

const socialLinks = [
  {
    icon: InstagramIcon,
    url: "https://www.instagram.com/hilandrealty.pvtltd/",
  },
  {
    icon: LinkedInIcon,
    url: "#",
  },
  {
    icon: FacebookIcon,
    url: "https://www.facebook.com/profile.php?id=61580704404240",
  },
];

const Footer = () => {
  const revealRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <Box id="contact" sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", md: "400px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${footerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "101%",
            background:
              "linear-gradient(to bottom, #deffcd 0%, rgba(222, 255, 205, 0) 40%, rgba(0,0,0,0.7) 100%)",
            zIndex: 1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ zIndex: 2, position: "relative" }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              color: "white",
              fontWeight: 800,
              fontFamily: '"Oranienbaum", serif',
              textTransform: "uppercase",
              letterSpacing: 2,
              px: 2,
              maxWidth: "800px",
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            STILL HAVE NOT FOUND WHAT YOU ARE LOOKING FOR ?
          </Typography>
        </motion.div>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#385A01",
          color: "white",
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 10 },
          boxShadow: "0px 30px 50px -10px rgba(0,0,0,0.8)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Box sx={{ mb: { xs: 6, md: 6 } }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    mb: 5,
                    textTransform: "uppercase",
                    fontFamily: '"Oranienbaum", serif',
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                  }}
                >
                  Leave your contact below. Our team will get in touch with you
                  for future site visits.
                </Typography>
              </motion.div>

              {/* Input Fields */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                  mb: 4,
                }}
              >
                {["Name", "Contact Number", "Email"].map((label) => (
                  <motion.div
                    key={label}
                    variants={itemVariants}
                    style={{ flex: 1 }}
                  >
                    <TextField
                      label={label}
                      variant="filled"
                      fullWidth
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "transparent",
                          borderRadius: "12px",
                          color: "white",
                          "&::before": { borderBottom: "none" },
                          "&::after": { borderBottom: "none" },
                          "&:hover:not(.Mui-disabled, .Mui-error):before": {
                            borderBottom: "none",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.6)",
                          fontWeight: 500,
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        "&:focus-within": {
                          backgroundColor: "rgba(255, 255, 255, 0.12)",
                          boxShadow: "0 0 0 1px rgba(255,255,255,0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    />
                  </motion.div>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
                <motion.div variants={itemVariants}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disableRipple
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          "&.Mui-checked": { color: "white" },
                          "& .MuiSvgIcon-root": { fontSize: 28 },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          fontWeight: 500,
                          letterSpacing: 0.5,
                        }}
                      >
                        BY CHECKING THIS BOX I ACCEPT NEWSLETTERS AND UPDATES
                        FROM HILAND REALTY
                      </Typography>
                    }
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: "100%", maxWidth: "300px" }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    fullWidth
                    sx={{
                      backgroundColor: "white",
                      color: "#385A01",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      py: 2,
                      borderRadius: "50px",
                      whiteSpace: "nowrap",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    Submit Response
                  </Button>
                </motion.div>
              </Box>
            </Box>

            <motion.div variants={itemVariants}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Hiland Realty Private Limited
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  #55, 2nd Floor, Railway parallel road, Seshadripuram,
                  <br />
                  Bangalore - 560020
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      <Box
        ref={revealRef}
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "#1c2d00",
          height: { xs: "480px", sm: "400px", md: "450px" },
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ height: "100%" }}>
          <motion.div
            style={{
              height: "100%",
              y,
              scale,
              opacity,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingBottom: "32px",
            }}
          >
            {/* HUGE BRAND TEXT */}
            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontFamily: '"Oranienbaum", serif',
                fontWeight: 400,
                fontSize: { xs: "2.8rem", sm: "5rem", md: "8rem" },
                letterSpacing: { xs: 1, md: 5 },
                mb: { xs: 4, md: 4 },
                textAlign: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                pb: { xs: 3, md: 4 },
              }}
            >
              HILAND REALTY
            </Typography>

            {/* BOTTOM BAR */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  textAlign: "center",
                }}
              >
                © 2026 HILAND REALTY ALL RIGHTS RESERVED
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Social Icons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  {socialLinks.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          component="a"
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            "&:hover": { color: "white" },
                          }}
                        >
                          <Icon />
                        </IconButton>
                      </motion.div>
                    );
                  })}
                </Box>

                {/* Policy Links */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {["FAQS", "PRIVACY POLICY", "TERMS & CONDITIONS"].map(
                    (link) => (
                      <Typography
                        key={link}
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 600,
                          letterSpacing: 1,
                          cursor: "pointer",
                          transition: "color 0.3s ease",
                          "&:hover": { color: "white" },
                        }}
                      >
                        {link}
                      </Typography>
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

// import {
//   Box,
//   Typography,
//   Container,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Button,
//   IconButton,
// } from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import { motion } from "framer-motion";
// import type { Variants } from "framer-motion";

// import footerBg from "../assets/footer_img.png";

// // --- FRAMER MOTION VARIANTS ---
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 70, damping: 20 },
//   },
// };

// const giantTextVariants: Variants = {
//   hidden: { opacity: 0, y: 60, scale: 0.95 },
//   visible: {
//     opacity: 0.9,
//     y: 0,
//     scale: 1,
//     transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }, // Cinematic smooth ease
//   },
// };

// const Footer = () => {
//   return (
//     <Box id="contact" sx={{ width: "100%", overflow: "hidden" }}>
//       {/* --- TOP SECTION: IMAGE WITH FADE & SCALE EFFECT --- */}
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           height: { xs: "300px", md: "400px" },
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden", // Keeps the scaling image contained
//         }}
//       >
//         {/* Animated Background Image */}
//         <motion.div
//           initial={{ scale: 1.15 }}
//           whileInView={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.3 }}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundImage: `url(${footerBg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: 0,
//           }}
//         />

//         {/* Gradient Overlay */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "101%",
//             background:
//               "linear-gradient(to bottom, #deffcd 0%, rgba(222, 255, 205, 0) 40%, rgba(0,0,0,0.7) 100%)",
//             zIndex: 1,
//           }}
//         />

//         {/* Image Text */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//           viewport={{ once: true }}
//           style={{ zIndex: 2, position: "relative" }}
//         >
//           <Typography
//             variant="h3"
//             component="h2"
//             align="center"
//             sx={{
//               color: "white",
//               fontWeight: 800,
//               fontFamily: '"Oranienbaum", serif',
//               textTransform: "uppercase",
//               letterSpacing: 2,
//               px: 2,
//               maxWidth: "800px",
//               fontSize: { xs: "2rem", md: "3rem" },
//               textShadow: "0px 4px 20px rgba(0,0,0,0.8)",
//             }}
//           >
//             STILL HAVE NOT FOUND WHAT YOU ARE LOOKING FOR ?
//           </Typography>
//         </motion.div>
//       </Box>

//       {/* --- BOTTOM SECTION: SOLID GREEN --- */}
//       <Box
//         sx={{
//           backgroundColor: "#385A01",
//           color: "white",
//           pt: { xs: 8, md: 10 },
//           pb: 4,
//         }}
//       >
//         <Container maxWidth="lg">
//           {/* --- FORM AREA WITH STAGGERED REVEAL --- */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//           >
//             <Box sx={{ mb: 10 }}>
//               <motion.div variants={itemVariants}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 700,
//                     letterSpacing: 1.5,
//                     mb: 5,
//                     textTransform: "uppercase",
//                     fontFamily: '"Oranienbaum", serif',
//                   }}
//                 >
//                   Leave your contact below. Our team will get in touch with you
//                   for future site visits.
//                 </Typography>
//               </motion.div>

//               {/* Input Fields Row */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", md: "row" },
//                   gap: 3,
//                   mb: 4,
//                 }}
//               >
//                 {["Name", "Contact Number", "Email"].map((label) => (
//                   <motion.div key={label} variants={itemVariants} style={{ flex: 1 }}>
//                     <TextField
//                       label={label}
//                       variant="filled"
//                       fullWidth
//                       sx={{
//                         backgroundColor: "rgba(255, 255, 255, 0.08)",
//                         borderRadius: "12px",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "transparent",
//                           borderRadius: "12px",
//                           color: "white",
//                           "&::before": { borderBottom: "none" },
//                           "&::after": { borderBottom: "none" },
//                           "&:hover:not(.Mui-disabled, .Mui-error):before": {
//                             borderBottom: "none",
//                           },
//                         },
//                         "& .MuiInputLabel-root": {
//                           color: "rgba(255, 255, 255, 0.6)",
//                           fontWeight: 500,
//                         },
//                         "& .MuiInputLabel-root.Mui-focused": {
//                           color: "white",
//                         },
//                         "&:focus-within": {
//                           backgroundColor: "rgba(255, 255, 255, 0.12)",
//                           boxShadow: "0 0 0 1px rgba(255,255,255,0.3)",
//                         },
//                         transition: "all 0.3s ease",
//                       }}
//                     />
//                   </motion.div>
//                 ))}
//               </Box>

//               {/* Checkbox & Submit Button Row */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   gap: 3,
//                 }}
//               >
//                 <motion.div variants={itemVariants}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         disableRipple
//                         sx={{
//                           color: "rgba(255,255,255,0.5)",
//                           "&.Mui-checked": { color: "white" },
//                           "& .MuiSvgIcon-root": { fontSize: 28 },
//                         }}
//                       />
//                     }
//                     label={
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: "rgba(255,255,255,0.7)",
//                           fontWeight: 500,
//                           letterSpacing: 0.5,
//                         }}
//                       >
//                         BY CHECKING THIS BOX I ACCEPT NEWSLETTERS AND UPDATES
//                         FROM HILAND REALTY
//                       </Typography>
//                     }
//                   />
//                 </motion.div>

//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     variant="contained"
//                     size="medium"
//                     sx={{
//                       backgroundColor: "white",
//                       color: "#385A01",
//                       fontWeight: 800,
//                       fontSize: "1.1rem",
//                       px: 6,
//                       py: 2,
//                       borderRadius: "50px",
//                       whiteSpace: "nowrap",
//                       boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
//                       "&:hover": {
//                         backgroundColor: "#f0f0f0",
//                         boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
//                       },
//                     }}
//                   >
//                     Submit Response
//                   </Button>
//                 </motion.div>
//               </Box>
//             </Box>
//           </motion.div>

//           {/* --- COMPANY INFO --- */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//           >
//             <Box sx={{ mb: 6 }}>
//               <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//                 Hiland Realty Private Limited
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{ color: "rgba(255,255,255,0.8)" }}
//               >
//                 #55, 2nd Floor, Railway parallel road, Seshadripuram,
//                 <br />
//                 Bangalore - 560020
//               </Typography>
//             </Box>
//           </motion.div>

//           {/* --- HUGE BRAND TEXT REVEAL --- */}
//           <motion.div
//             variants={giantTextVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}
//           >
//             <Typography
//               variant="h1"
//               sx={{
//                 fontFamily: '"Oranienbaum", serif',
//                 fontWeight: 400,
//                 fontSize: { xs: "3rem", md: "8rem" },
//                 letterSpacing: { xs: 2, md: 5 },
//                 mb: 4,
//                 textAlign: "center",
//                 borderBottom: "1px solid rgba(255,255,255,0.2)",
//                 pb: 4,
//               }}
//             >
//               HILAND REALTY
//             </Typography>
//           </motion.div>

//           {/* --- BOTTOM BAR --- */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               justifyContent: "space-between",
//               alignItems: { xs: "center", md: "flex-end" },
//               gap: 4,
//             }}
//           >
//             {/* Left: Copyright */}
//             <Typography
//               variant="body2"
//               sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 1 }}
//             >
//               © 2026 HILAND REALTY ALL RIGHTS RESERVED
//             </Typography>

//             {/* Right: Socials & Links */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: { xs: "center", md: "flex-end" },
//                 gap: 2,
//               }}
//             >
//               {/* Animated Social Icons */}
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 {[InstagramIcon, LinkedInIcon, FacebookIcon].map((Icon, i) => (
//                   <motion.div key={i} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//                     <IconButton sx={{ color: "white" }} >
//                       <Icon />
//                     </IconButton>
//                   </motion.div>
//                 ))}
//               </Box>

//               {/* Policy Links */}
//               <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
//                 {["FAQS", "PRIVACY POLICY", "TERMS & CONDITIONS"].map((link) => (
//                   <Typography
//                     key={link}
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255,255,255,0.6)",
//                       fontWeight: 600,
//                       letterSpacing: 1,
//                       cursor: "pointer",
//                       transition: "color 0.3s ease",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {link}
//                   </Typography>
//                 ))}
//               </Box>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;
