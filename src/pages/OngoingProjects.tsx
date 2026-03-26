import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Button,
  Fade,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

// Images
import img1 from "../assets/ever_green_1.jpg";
import img2 from "../assets/ever_green_2.jpg";
import img3 from "../assets/ever_green_3.jpg";
import img4 from "../assets/ever_green_4.png";
import img5 from "../assets/ever_green_5.jpg";

// See More Images
import see_more_img1 from "../assets/ever_green_seemore_1.png";
import see_more_img2 from "../assets/ever_green_seemore_2.png";
import see_more_img3 from "../assets/ever_green_seemore_3.png";

// --- DATA ---
const ongoingProjects = [
  {
    id: 1,
    image: img1,
    description:
      "Premium gated farmland community near Doddaballapura Road designed for peaceful weekend living and intelligent long-term investment. A rare blend of nature, privacy, and high-growth potential.",
  },
  {
    id: 2,
    image: img2,
    description:
      "29 exclusive low-density farm plots Ensuring privacy, space, and a premium low-density living experience.",
  },
  {
    id: 3,
    image: img3,
    description:
      "Managed plantation support Enjoy hassle-free ownership with expert plantation care and maintenance.",
  },
  {
    id: 4,
    image: img4,
    description:
      "Clubhouse & wellness retreat Designed for relaxation, recreation, and a rejuvenating lifestyle.",
  },
  {
    id: 5,
    image: img5,
    description:
      "Private farmhouse Designed and Developed by our team in a Contemporary A-frame style, blending Modern Aesthetics with functionality.",
  },
];

const seeMoreDetails = [
  {
    id: 1,
    image: see_more_img1,
    title: "Neighbourhood and Facilities",
    description:
      "Evergreen Heaven is strategically located within city limits, offering seamless access to all essential amenities. From healthcare facilities and shopping conveniences to fuel stations and everyday necessities, everything you need is right around the corner. Adding to its unmatched connectivity, the project also enjoys close proximity to the international airport making comfort, convenience, and a part of everyday life. Seamless access to essentials while staying close to nature. A location that enhances both lifestyle convenience and investment value.",
  },
  {
    id: 2,
    image: see_more_img2,
    title: "Premium Architecture",
    description:
      "Nestled within 15 acres of lush fields, Evergreen Heaven is where luxury meets nature in every direction. Thoughtfully planned 30 farm plots are set amid sweeping meadows, offering a secure, well-maintained sanctuary away from the rush of city life. This enchanting landscape invites you to let your worries melt away and surrender to the calming embrace of thoughtfully curated outdoor amenities. With flexible plot options and a truly stress-free ownership experience. Thoughtfully designed to blend natural beauty with modern comfort. A space where every detail adds to long-term value and peace of mind.",
  },
  {
    id: 3,
    image: see_more_img3,
    title: "Location Highlights",
    description:
      "Located near DODDABALLAPURA ROAD Ardeshnahalli and Kasavanahalli, an inspiring avenue weaves through the community, guided by the serene presence of lush farmlands all around. This thoughtfully designed pathway enhances the sense of openness and harmony, creating a seamless connection between nature, movement, and mindful living. Surrounded by rapidly developing growth corridors. An address that promises strong future appreciation.",
  },
];

const noiseBackground = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const BackgroundLayers = () => (
  <>
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${img4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.55) contrast(1.1)",
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(60,60,60,0.8) 100%)",
        zIndex: 0.5,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: noiseBackground,
        opacity: 0.05,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  </>
);

const MainCarousel = ({ currentIndex, onCardClick }: any) => {
  const getCardPosition = (index: number) => {
    let difference = index - currentIndex;
    if (difference === 3) difference = -2;
    if (difference === 4) difference = -1;
    if (difference === -3) difference = 2;
    if (difference === -4) difference = 1;
    return difference;
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "280px", md: "350px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
      }}
    >
      {ongoingProjects.map((project, index) => {
        const position = getCardPosition(index);
        const isCenter = position === 0;
        const isLeft1 = position === -1;
        const isRight1 = position === 1;
        const isLeft2 = position === -2;
        const isRight2 = position === 2;

        let translateX = "0%";
        if (isLeft1) translateX = "-60%";
        if (isRight1) translateX = "60%";
        if (isLeft2) translateX = "-120%";
        if (isRight2) translateX = "120%";

        let scale = 1;
        if (isLeft1 || isRight1) scale = 0.75;
        if (isLeft2 || isRight2) scale = 0.55;

        let zIndex = 5;
        if (isLeft1 || isRight1) zIndex = 4;
        if (isLeft2 || isRight2) zIndex = 3;

        let opacity = 1;
        if (isLeft1 || isRight1) opacity = 0.6;
        if (isLeft2 || isRight2) opacity = 0.2;

        return (
          <Box
            key={project.id}
            onClick={() => {
              if (!isCenter) onCardClick(index);
            }}
            sx={{
              position: "absolute",
              width: { xs: "220px", sm: "300px", md: "450px" },
              height: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              cursor: isCenter ? "default" : "pointer",
              transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
              transform: `translateX(${translateX}) scale(${scale})`,
              zIndex: zIndex,
              opacity: opacity,
              boxShadow: isCenter
                ? "0 20px 50px rgba(0,0,0,0.5)"
                : "0 10px 20px rgba(0,0,0,0.3)",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: isCenter
                  ? "transparent"
                  : "rgba(255, 255, 255, 0.05)",
                backdropFilter: isCenter ? "none" : "blur(2px)",
                transition: "all 0.8s ease",
              },
            }}
          >
            <Box
              component="img"
              src={project.image}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const CarouselControls = ({ description, onPrev, onNext, onExplore }: any) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "24px",
      p: { xs: 3, md: 4 },
      maxWidth: "800px",
      mx: "auto",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        mb: 2,
      }}
    >
      <IconButton
        onClick={onPrev}
        sx={{
          color: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box sx={{ textAlign: "center", px: 2, flex: 1 }}>
        <Typography
          variant="body1"
          sx={{
            color: "#FFFFFF",
            lineHeight: 1.6,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {description}
        </Typography>
      </Box>
      <IconButton
        onClick={onNext}
        sx={{
          color: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
    <Button
      variant="outlined"
      onClick={onExplore}
      sx={{
        color: "white",
        borderColor: "rgba(255,255,255,0.3)",
        borderRadius: "30px",
        px: 4,
        py: 1,
        mt: 1,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      Explore Details
    </Button>
  </Box>
);

const SeeMoreOverlay = ({
  isOpen,
  onClose,
  currentIndex,
  onPrev,
  onNext,
}: any) => {
  const currentDetail = seeMoreDetails[currentIndex];

  return (
    <Fade in={isOpen} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(15px)",
          display: isOpen ? "block" : "none",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            backgroundImage: noiseBackground,
            opacity: 0.03,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <IconButton
          onClick={onClose}
          sx={{
            position: "fixed",
            top: { xs: 16, md: 32 },
            right: { xs: 16, md: 32 },
            color: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
            zIndex: 10,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <Box
          sx={{
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            py: { xs: 10, md: 4 },
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 4, md: 8 },
              }}
            >
              <Box sx={{ flex: 1, width: "100%" }}>
                <Box
                  key={currentDetail.id}
                  component="img"
                  src={currentDetail.image}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: { xs: "300px", md: "600px" },
                    objectFit: "fit",
                    borderRadius: "24px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    animation: "fadeIn 0.6s ease-in-out",
                    "@keyframes fadeIn": {
                      "0%": { opacity: 0, transform: "scale(0.98)" },
                      "100%": { opacity: 1, transform: "scale(1)" },
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontFamily: '"Oranienbaum", serif',
                    mb: 2,
                    fontSize: { xs: "2rem", md: "3.5rem" },
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                  }}
                >
                  {currentDetail.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    mb: 5,
                  }}
                >
                  {currentDetail.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <IconButton
                    onClick={onPrev}
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "white",
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ color: "white", letterSpacing: 2 }}>
                    {currentIndex + 1} / {seeMoreDetails.length}
                  </Typography>
                  <IconButton
                    onClick={onNext}
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "white",
                      },
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Fade>
  );
};

const OngoingProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [seeMoreIndex, setSeeMoreIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (isSeeMoreOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 30000);
    return () => clearInterval(timer);
  }, [isSeeMoreOpen]);

  // Main Handlers
  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev === ongoingProjects.length - 1 ? 0 : prev + 1,
    );
  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? ongoingProjects.length - 1 : prev - 1,
    );

  // See More Handlers
  const handleSeeMoreNext = () =>
    setSeeMoreIndex((prev) =>
      prev === seeMoreDetails.length - 1 ? 0 : prev + 1,
    );
  const handleSeeMorePrev = () =>
    setSeeMoreIndex((prev) =>
      prev === 0 ? seeMoreDetails.length - 1 : prev - 1,
    );

  return (
    <>
      <Box
        id="ongoing"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#3C3C3C",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          py: 12,
        }}
      >
        <BackgroundLayers />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "3rem", md: "5rem" },
              letterSpacing: 2,
              fontFamily: '"Oranienbaum", serif',
              mb: { xs: 2, md: 3 },
              textAlign: "center",
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E"), #FFFFFF1A`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            EVERGREEN HEAVEN
          </Typography>

          <MainCarousel
            currentIndex={currentIndex}
            onCardClick={setCurrentIndex}
          />

          <CarouselControls
            description={ongoingProjects[currentIndex].description}
            onPrev={handlePrev}
            onNext={handleNext}
            onExplore={() => setIsSeeMoreOpen(true)}
          />
        </Container>
      </Box>

      <SeeMoreOverlay
        isOpen={isSeeMoreOpen}
        onClose={() => setIsSeeMoreOpen(false)}
        currentIndex={seeMoreIndex}
        onPrev={handleSeeMorePrev}
        onNext={handleSeeMoreNext}
      />
    </>
  );
};

export default OngoingProjects;

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   IconButton,
//   Button,
//   Fade,
// } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import CloseIcon from "@mui/icons-material/Close";

// import img1 from "../assets/ever_green_1.jpg";
// import img2 from "../assets/ever_green_2.jpg";
// import img3 from "../assets/ever_green_3.jpg";
// import img4 from "../assets/ever_green_4.png";
// import img5 from "../assets/ever_green_5.jpg";

// // See More Images
// import see_more_img1 from "../assets/ever_green_seemore_1.png";
// import see_more_img2 from "../assets/ever_green_seemore_2.png";
// import see_more_img3 from "../assets/ever_green_seemore_3.png";

// const ongoingProjects = [
//   {
//     id: 1,
//     image: img1,
//     description:
//       "Premium gated farmland community near Doddaballapura Road designed for peaceful weekend living and intelligent long-term investment.",
//   },
//   {
//     id: 2,
//     image: img2,
//     description: "29 exclusive low-density farm plots",
//   },
//   {
//     id: 3,
//     image: img3,
//     description: "Managed plantation support",
//   },
//   {
//     id: 4,
//     image: img4,
//     description: "Clubhouse & wellness retreat",
//   },
//   {
//     id: 5,
//     image: img5,
//     description: "Private farmhouse",
//   },
// ];

// // --- SEE MORE DATA ARRAY ---
// const seeMoreDetails = [
//   {
//     id: 1,
//     image: see_more_img1,
//     title: "Neighbourhood and Facilities",
//     description:
//       "Evergreen Heaven is strategically located within city limits, offering seamless access to all essential amenities. From healthcare facilities and shopping conveniences to fuel stations and everyday necessities, everything you need is right around the corner. Adding to its unmatched connectivity, the project also enjoys close proximity to the international airport making comfort, convenience, and a part of everyday life.",
//   },
//   {
//     id: 2,
//     image: see_more_img2,
//     title: "Premium Architecture",
//     description:
//       "Nestled within 15 acres of lush fields, Evergreen Heaven is where luxury meets nature in every direction. Thoughtfully planned 30 farm plots are set amid sweeping meadows, offering a secure, well-maintained sanctuary away from the rush of city life. This enchanting landscape invites you to let your worries melt away and surrender to the calming embrace of thoughtfully curated outdoor amenities. With flexible plot options and a truly stress-free ownership experience.",
//   },
//   {
//     id: 3,
//     image: see_more_img3,
//     title: "Location Highlights",
//     description:
//       "Located near DODDABALLAPURA ROAD Ardeshnahalli and Kasavanahalli, an inspiring avenue weaves through the community, guided by the serene presence of lush farmlands all around. This thoughtfully designed pathway enhances the sense of openness and harmony, creating a seamless connection between nature, movement, and mindful living.",
//   },
// ];

// // --- NOISE BACKGROUND URL ---
// const noiseBackground = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// const OngoingProjects = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // States for the See More Page
//   const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
//   const [seeMoreIndex, setSeeMoreIndex] = useState(0);

//   // Auto-scroll for main carousel
//   useEffect(() => {
//     if (isSeeMoreOpen) return;
//     const timer = setInterval(() => {
//       handleNext();
//     }, 30000);
//     return () => clearInterval(timer);
//   }, [isSeeMoreOpen]);

//   // Main Carousel Controls
//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === ongoingProjects.length - 1 ? 0 : prev + 1,
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? ongoingProjects.length - 1 : prev - 1,
//     );
//   };

//   // See More Controls
//   const handleSeeMoreNext = () => {
//     setSeeMoreIndex((prev) =>
//       prev === seeMoreDetails.length - 1 ? 0 : prev + 1,
//     );
//   };

//   const handleSeeMorePrev = () => {
//     setSeeMoreIndex((prev) =>
//       prev === 0 ? seeMoreDetails.length - 1 : prev - 1,
//     );
//   };

//   // --- 3D MATH LOGIC ---
//   const getCardPosition = (index: number) => {
//     let difference = index - currentIndex;
//     if (difference === 3) difference = -2;
//     if (difference === 4) difference = -1;
//     if (difference === -3) difference = 2;
//     if (difference === -4) difference = 1;
//     return difference;
//   };

//   return (
//     <>
//       <Box
//         id="ongoing"
//         sx={{
//           position: "relative",
//           width: "100%",
//           minHeight: "100vh",
//           backgroundColor: "#3C3C3C",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden",
//           py: 12,
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             backgroundImage: `url(${img4})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             filter: "brightness(0.55) contrast(1.1)",
//             zIndex: 0,
//           }}
//         />

//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(60,60,60,0.8) 100%)",
//             zIndex: 0.5,
//           }}
//         />

//         {/* 1. NOISE OVERLAY */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundImage: noiseBackground,
//             opacity: 0.05,
//             pointerEvents: "none",
//             zIndex: 1,
//           }}
//         />

//         {/* 3. 3D CAROUSEL CONTAINER */}
//         <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
//           <Typography
//             variant="h2"
//             component="h2"
//             sx={{
//               fontWeight: 400,
//               fontSize: { xs: "3rem", md: "5rem" },
//               letterSpacing: 2,
//               fontFamily: '"Oranienbaum", serif',
//               mb: { xs: 2, md: 3 },
//               textAlign: "center",
//               textTransform: "uppercase",
//               background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E"), #FFFFFF1A`,
//               WebkitBackgroundClip: "text",
//               backgroundClip: "text",
//               color: "transparent",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             EVERGREEN HEAVEN
//           </Typography>

//           <Box
//             sx={{
//               position: "relative",
//               height: { xs: "280px", md: "350px" },
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               mb: 4,
//             }}
//           >
//             {ongoingProjects.map((project, index) => {
//               const position = getCardPosition(index);

//               const isCenter = position === 0;
//               const isLeft1 = position === -1;
//               const isRight1 = position === 1;
//               const isLeft2 = position === -2;
//               const isRight2 = position === 2;

//               let translateX = "0%";
//               if (isLeft1) translateX = "-60%";
//               if (isRight1) translateX = "60%";
//               if (isLeft2) translateX = "-120%";
//               if (isRight2) translateX = "120%";

//               let scale = 1;
//               if (isLeft1 || isRight1) scale = 0.75;
//               if (isLeft2 || isRight2) scale = 0.55;

//               let zIndex = 5;
//               if (isLeft1 || isRight1) zIndex = 4;
//               if (isLeft2 || isRight2) zIndex = 3;

//               let opacity = 1;
//               if (isLeft1 || isRight1) opacity = 0.6;
//               if (isLeft2 || isRight2) opacity = 0.2;

//               return (
//                 <Box
//                   key={project.id}
//                   onClick={() => {
//                     if (!isCenter) setCurrentIndex(index);
//                   }}
//                   sx={{
//                     position: "absolute",
//                     width: { xs: "220px", sm: "300px", md: "450px" },
//                     height: "100%",
//                     borderRadius: "24px",
//                     overflow: "hidden",
//                     cursor: isCenter ? "default" : "pointer",
//                     transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
//                     transform: `translateX(${translateX}) scale(${scale})`,
//                     zIndex: zIndex,
//                     opacity: opacity,
//                     boxShadow: isCenter
//                       ? "0 20px 50px rgba(0,0,0,0.5)"
//                       : "0 10px 20px rgba(0,0,0,0.3)",
//                     "&::after": {
//                       content: '""',
//                       position: "absolute",
//                       inset: 0,
//                       background: isCenter
//                         ? "transparent"
//                         : "rgba(255, 255, 255, 0.05)",
//                       backdropFilter: isCenter ? "none" : "blur(2px)",
//                       transition: "all 0.8s ease",
//                     },
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={project.image}
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Box>
//               );
//             })}
//           </Box>

//           {/* 4. ACTIVE INFO & CONTROLS */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               backgroundColor: "rgba(255, 255, 255, 0.05)",
//               backdropFilter: "blur(20px)",
//               border: "1px solid rgba(255, 255, 255, 0.1)",
//               borderRadius: "24px",
//               p: { xs: 3, md: 4 },
//               maxWidth: "800px",
//               mx: "auto",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: "100%",
//                 mb: 2,
//               }}
//             >
//               <IconButton
//                 onClick={handlePrev}
//                 sx={{
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
//                 }}
//               >
//                 <ArrowBackIosNewIcon />
//               </IconButton>

//               <Box sx={{ textAlign: "center", px: 2, flex: 1 }}>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: "#FFFFFF",
//                     lineHeight: 1.6,
//                     textTransform: "uppercase",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {ongoingProjects[currentIndex].description}
//                 </Typography>
//               </Box>

//               <IconButton
//                 onClick={handleNext}
//                 sx={{
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
//                 }}
//               >
//                 <ArrowForwardIosIcon />
//               </IconButton>
//             </Box>

//             <Button
//               variant="outlined"
//               onClick={() => setIsSeeMoreOpen(true)}
//               sx={{
//                 color: "white",
//                 borderColor: "rgba(255,255,255,0.3)",
//                 borderRadius: "30px",
//                 px: 4,
//                 py: 1,
//                 mt: 1,
//                 textTransform: "uppercase",
//                 letterSpacing: 1.5,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   borderColor: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   transform: "translateY(-2px)",
//                 },
//               }}
//             >
//               Explore Details
//             </Button>
//           </Box>
//         </Container>
//       </Box>

//       <Fade in={isSeeMoreOpen} timeout={500}>
//         <Box
//           sx={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 9999,
//             backgroundColor: "rgba(0, 0, 0, 0.65)",
//             backdropFilter: "blur(15px)",
//             display: isSeeMoreOpen ? "block" : "none",
//             overflowY: "auto",
//           }}
//         >
//           {/* Noise effect for the new page */}
//           <Box
//             sx={{
//               position: "fixed",
//               inset: 0,
//               backgroundImage: noiseBackground,
//               opacity: 0.03,
//               pointerEvents: "none",
//               zIndex: 0,
//             }}
//           />

//           {/* Close Button */}
//           <IconButton
//             onClick={() => setIsSeeMoreOpen(false)}
//             sx={{
//               position: "fixed",
//               top: { xs: 16, md: 32 },
//               right: { xs: 16, md: 32 },
//               color: "white",
//               backgroundColor: "rgba(255,255,255,0.1)",
//               zIndex: 10,
//               "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
//             }}
//           >
//             <CloseIcon fontSize="large" />
//           </IconButton>

//           <Box
//             sx={{
//               minHeight: "100%",
//               display: "flex",
//               alignItems: "center",
//               py: { xs: 10, md: 4 },
//             }}
//           >
//             <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", md: "row" },
//                   alignItems: "center",
//                   gap: { xs: 4, md: 8 },
//                 }}
//               >
//                 {/* LEFT SIDE: Image */}
//                 <Box sx={{ flex: 1, width: "100%" }}>
//                   <Box
//                     key={seeMoreDetails[seeMoreIndex].id}
//                     component="img"
//                     src={seeMoreDetails[seeMoreIndex].image}
//                     sx={{
//                       width: "100%",
//                       height: "auto",
//                       maxHeight: { xs: "300px", md: "600px" },
//                       objectFit: "fit",
//                       borderRadius: "24px",
//                       boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       animation: "fadeIn 0.6s ease-in-out",
//                       "@keyframes fadeIn": {
//                         "0%": { opacity: 0, transform: "scale(0.98)" },
//                         "100%": { opacity: 1, transform: "scale(1)" },
//                       },
//                     }}
//                   />
//                 </Box>

//                 {/* RIGHT SIDE: Content & Controls */}
//                 <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       color: "white",
//                       fontFamily: '"Oranienbaum", serif',
//                       mb: 2,
//                       fontSize: { xs: "2rem", md: "3.5rem" },
//                       lineHeight: 1.1,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     {seeMoreDetails[seeMoreIndex].title}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: "rgba(255,255,255,0.7)",
//                       fontSize: { xs: "1rem", md: "1.1rem" },
//                       lineHeight: 1.8,
//                       mb: 5,
//                     }}
//                   >
//                     {seeMoreDetails[seeMoreIndex].description}
//                   </Typography>

//                   {/* Navigation Controls */}
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//                     <IconButton
//                       onClick={handleSeeMorePrev}
//                       sx={{
//                         color: "white",
//                         border: "1px solid rgba(255,255,255,0.3)",
//                         backgroundColor: "transparent",
//                         "&:hover": {
//                           backgroundColor: "rgba(255,255,255,0.1)",
//                           borderColor: "white",
//                         },
//                       }}
//                     >
//                       <ArrowBackIosNewIcon fontSize="small" />
//                     </IconButton>

//                     <Typography sx={{ color: "white", letterSpacing: 2 }}>
//                       {seeMoreIndex + 1} / {seeMoreDetails.length}
//                     </Typography>

//                     <IconButton
//                       onClick={handleSeeMoreNext}
//                       sx={{
//                         color: "white",
//                         border: "1px solid rgba(255,255,255,0.3)",
//                         backgroundColor: "transparent",
//                         "&:hover": {
//                           backgroundColor: "rgba(255,255,255,0.1)",
//                           borderColor: "white",
//                         },
//                       }}
//                     >
//                       <ArrowForwardIosIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               </Box>
//             </Container>
//           </Box>
//         </Box>
//       </Fade>
//     </>
//   );
// };

// export default OngoingProjects;
