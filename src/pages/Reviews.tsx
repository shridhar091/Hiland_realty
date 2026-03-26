import { Box, Typography, Container, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useEffect, useRef, useState } from "react";

const reviewsData = [
  {
    id: 1,
    name: "Dev",
    avatar: "",
    review: "HILAND REALTY NOT JUST PROVIDES A PROPERTY BUT A WHOLE NEW LIFESTYLE",
  },
  {
    id: 2,
    name: "Rohit",
    avatar: "",
    review: "THE TEAM WAS INCREDIBLY TRANSPARENT. BEST INVESTMENT I HAVE EVER MADE.",
  },
  {
    id: 3,
    name: "Bhavana",
    avatar: "",
    review: "FROM PAPERWORK TO POSSESSION, THE ENTIRE PROCESS WAS SEAMLESS AND FAST.",
  },
  {
    id: 4,
    name: "Gunjita",
    avatar: "",
    review: "A BEAUTIFUL GATED COMMUNITY. MY FAMILY LOVES THE WEEKEND VIBES HERE.",
  },
];

// We double the array to create a seamless infinite scrolling loop
const infiniteReviews = [...reviewsData, ...reviewsData];

// --- FRAMER MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const interactionTimeout = useRef<number | null>(null);

  const handlePauseAutoScroll = () => {
    setIsInteracting(true);
    if (interactionTimeout.current) window.clearTimeout(interactionTimeout.current);
  };

  const handleResumeAutoScroll = () => {
    interactionTimeout.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 1500);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const scrollSpeed = 1;

    const scroll = () => {
      if (!isInteracting) {
        el.scrollLeft += scrollSpeed;
        
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  return (
    <Box
      id="reviews"
      sx={{
        backgroundColor: "#deffcd",
        py: { xs: 6, md: 10 },
        overflow: "hidden", 
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: -1,
              mb: { xs: 4, md: 8 },
              fontFamily: '"Oranienbaum", serif',
              color: "#000000",
            }}
          >
            WHAT OUR CLIENTS SAY
          </Typography>
        </motion.div>
      </Container>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box
          ref={scrollRef}
          onMouseEnter={handlePauseAutoScroll}
          onMouseLeave={handleResumeAutoScroll}
          onTouchStart={handlePauseAutoScroll}
          onTouchEnd={handleResumeAutoScroll}
          sx={{
            display: "flex",
            alignItems: "stretch", 
            gap: { xs: 2, md: 3 },
            px: { xs: 2, md: 4 }, 
            pb: 4, 
            width: "100%", 
            overflowX: "auto", 
            scrollBehavior: "auto", 
            WebkitOverflowScrolling: "touch", 
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            cursor: isInteracting ? "grabbing" : "grab",
          }}
        >
          {infiniteReviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              style={{ display: "flex" }} 
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#385A01",
                  color: "white",
                  minWidth: { xs: "75vw", sm: "260px", md: "320px" },
                  maxWidth: { xs: "75vw", sm: "260px", md: "320px" },
                  height: "100%", 
                  p: { xs: 2.5, md: 3 }, 
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(56, 90, 1, 0.2)",
                  overflow: "hidden",
                }}
              >
                <FormatQuoteIcon
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: 5,
                    fontSize: "100px",
                    color: "rgba(255, 255, 255, 0.05)",
                    transform: "rotate(180deg)",
                    zIndex: 0,
                  }}
                />

                {/* REVIEW TEXT */}
                <Typography
                  variant="body1"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    lineHeight: 1.5,
                    fontSize: { xs: "0.85rem", md: "0.95rem" }, 
                    color: "rgba(255, 255, 255, 0.95)",
                    fontStyle: "italic",
                    mb: 3,
                  }}
                >
                  "{review.review}"
                </Typography>

                {/* BOTTOM ROW: AVATAR & NAME */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative", zIndex: 1, mt: "auto" }}>
                  <Avatar
                    src={review.avatar}
                    alt={review.name}
                    sx={{
                      width: { xs: 45, md: 50 }, 
                      height: { xs: 45, md: 50 },
                      border: "2px solid #deffcd",
                      backgroundColor: "rgba(255,255,255,0.1)", 
                    }}
                  >
                    {!review.avatar && review.name.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        letterSpacing: 0.5,
                        fontFamily: '"Oranienbaum", serif',
                        fontSize: "1rem", 
                        lineHeight: 1,
                      }}
                    >
                      {review.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.7rem" }}>
                      Verified Client
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default Reviews;

// import { Box, Typography, Container, Avatar } from "@mui/material";
// import { keyframes } from "@mui/system";

// // Moves the content to the left continuously
// const scrollMarquee = keyframes`
//   0% { transform: translateX(0%); }
//   100% { transform: translateX(-50%); } 
// `;

// const reviewsData = [
//   {
//     id: 1,
//     name: "Dev",
//     avatar: "",
//     review: "HILAND REALTY NOT JUST PROVIDES  A PROPERTY BUT A WHOLE NEW LIFESTYLE ",
//   },
//   {
//     id: 2,
//     name: "Rohit",
//     avatar: "",
//     review: "HILAND REALTY NOT JUST PROVIDES  A PROPERTY BUT A WHOLE NEW LIFESTYLE ",
//   },
//   {
//     id: 3,
//     name: "Bhavana",
//     avatar: "",
//     review: "HILAND REALTY NOT JUST PROVIDES  A PROPERTY BUT A WHOLE NEW LIFESTYLE ",
//   },
//   {
//     id: 4,
//     name: "Gunjita",
//     avatar: "",
//     review: "HILAND REALTY NOT JUST PROVIDES  A PROPERTY BUT A WHOLE NEW LIFESTYLE ",
//   },
// ];

// const Reviews = () => {
//   return (
//     <Box
//       id="reviews"
//       sx={{
//         backgroundColor: "#deffcd",
//         py: { xs: 4, md: 8 },
//         overflow: "hidden",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* --- PAGE HEADING --- */}
//         <Typography
//           variant="h3"
//           component="h2"
//           align="center"
//           sx={{
//             fontWeight: 400,
//             textTransform: "uppercase",
//             letterSpacing: -1,
//             mb: 8,
//             fontFamily: '"Oranienbaum", serif',
//             color: "#000000",
//           }}
//         >
//           WHAT OUR CLIENTS SAY
//         </Typography>
//       </Container>

//       <Box
//         sx={{
//           display: "flex",
//           width: "200%",
//           "&:hover .marquee-content": {
//             animationPlayState: "paused",
//           },
//         }}
//       >
//         <Box
//           className="marquee-content"
//           sx={{
//             display: "flex",
//             gap: 4,
//             px: 2,
//             animation: `${scrollMarquee} 35s linear infinite`,
//             width: "100%",
//           }}
//         >
//           {/* We map the array TWICE to create a seamless infinite loop */}
//           {[...reviewsData, ...reviewsData].map((review, index) => (
//             <Box
//               key={index}
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 backgroundColor: "#385A01",
//                 color: "white",
//                 minWidth: { xs: "320px", md: "450px" },
//                 maxWidth: "450px",
//                 p: 4,
//                 borderRadius: "24px",
//                 boxShadow: "0 10px 30px rgba(56, 90, 1, 0.2)",
//                 gap: 3,
//                 transition: "transform 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                 },
//               }}
//             >
//               {/* LEFT SIDE: Avatar */}
//               <Avatar
//                 src={review.avatar}
//                 alt={review.name}
//                 sx={{
//                   width: { xs: 60, md: 80 },
//                   height: { xs: 60, md: 80 },
//                   border: "3px solid #deffcd",
//                   flexShrink: 0, 
//                 }}
//               />

//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 800,
//                     letterSpacing: 0.5,
//                     mb: 1,
//                     fontFamily: '"Oranienbaum", serif',
//                   }}
//                 >
//                   {review.name}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     lineHeight: 1.6,
//                     fontSize: "0.95rem",
//                     color: "rgba(255, 255, 255, 0.9)",
//                     fontStyle: "Oranienbaum",
//                   }}
//                 >
//                   "{review.review}"
//                 </Typography>
//               </Box>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Reviews;