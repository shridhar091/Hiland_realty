import { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Typography,
  Container,
  Chip,
  Dialog,
  IconButton,
  Slide,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// Project Images
import hiland_nest_img from "../assets/project1.png";
import epi_heritage_img from "../assets/epi_heritage.png";
import hiland_encalve_img from "../assets/hiland_enclave.png";
import hiland_serence from "../assets/hiland_serence.png";
import hiland_blossom_img from "../assets/hiland_blossom.png";
import hiland_brundavana_img1 from "../assets/hiland_brundavana_1.png";
import hiland_brundavana_img2 from "../assets/hiland_brundavana_2.png";

// Layout Images
import hiland_nest_layout_img from "../assets/hiland_nest_layout.png";
import epi_heritage_layout_img from "../assets/epi_heritage_layout.png";
import hiland_blossom_layout from "../assets/hiland_blossom_layout.png";
import hiland_brudavana_layout from "../assets/hiland_brudavana_layout.png";

// Map Images
import epi_heritage_map_img from "../assets/epi_heritage_location.png";
import hiland_blossom_location from "../assets/hiland_blossom_location.png";
import hiland_brundavana_location from "../assets/hiland_brudavana_location.png";

// --- MODAL TRANSITION ---
const Transition = forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

// --- PROJECT DATA ---
const projectsData = [
  {
    id: 1,
    title: "Hiland Nest",
    location: "M S Palya, Guniagrahara, Bangalore",
    desc1: "Nest is a gated community within city limits in Bangalore near M S Palya at Guniagrahara with modern amenities.",
    desc2: "This meticulously designed residential layout spread over 2 Acres 15 Guntas is located 23 km from M.G. Road and 8 km from BEL Circle.",
    features: ["DC Converted", "30 x 40", "30 x 50", "40 x 60"],
    amenities: ["Round-the-Clock Water Supply", "24/7 Power Supply", "Well-Designed Sewage Lines", "Well-Laid Roads"],
    images: [hiland_nest_img],
    layout: [hiland_nest_layout_img],
    mapUrl: "https://www.google.com/maps?q=12.985946,77.579551&z=15&output=embed",
  },
  {
    id: 2,
    title: "EPI Heritage",
    location: "Near ITC Factory, Bangalore International Airport Road",
    desc1: "EPI Heritage is a meticulously designed residential layout spread over 9 Acres 15 Guntas in North Bangalore.",
    desc2: "Located 29 km from M.G. Road and well connected by the six-lane NH7 (Bangalore–Hyderabad Highway). The upcoming Bangalore International Airport is approximately 7 km away, making it a prime investment destination.",
    features: ["BIAAPA Approved", "LIC Housing Finance Approved", "30 x 50", "40 x 50", "40 x 60"],
    amenities: ["Free Club Membership", "Round-the-Clock Water & Power Supply", "24-Hour Security", "Landscape & Common Area", "Well-Laid Concrete Roads", "Children Play Area"],
    images: [epi_heritage_img],
    layout: [epi_heritage_layout_img],
    locationImage: epi_heritage_map_img,
  },
  {
    id: 3,
    title: "Hiland Enclave",
    location: "Near Vijayapura Town, close to the upcoming International Airport",
    desc1: "Hiland Enclave is a thoughtfully planned residential layout located near Vijayapura town close to the upcoming International Airport.",
    desc2: "Spread across 7 Acres 15 Guntas with 114 sites, this project offers a great investment opportunity with access to hospitals, schools, colleges, supermarkets, railway and bus stations nearby.",
    features: ["Axis Bank Approved", "IDBI Bank Approved", "30 x 40", "30 x 50", "40 x 60", "Flexible Investment Options"],
    amenities: ["Park Area with Jogging Track", "Round-the-Clock Water & Power Supply", "24-Hour Security", "Children Play Area", "Well-Designed Sewage Lines", "Well-Laid Roads"],
    images: [hiland_encalve_img],
  },
  {
    id: 4,
    title: "Hiland Serene",
    location: "Near Bangalore International Airport",
    desc1: "Hiland Serene is an exclusive residential project designed for investors seeking high returns with low investment.",
    desc2: "Spread across 11 Acres 5 Guntas with around 179 sites, the project offers excellent connectivity and is located just minutes away from the New Bangalore International Airport.",
    features: ["DTCP Approved", "Approved by DHFL", "30 x 40", "30 x 50", "40 x 60"],
    amenities: ["Jogging Track", "Children Play Area", "24-Hour Security System", "Landscape & Common Area", "Well-Laid Concrete Roads", "Round-the-Clock Water & Power Supply", "Underground Wiring & Cabling"],
    images: [hiland_serence],
  },
  {
    id: 7,
    title: "Hiland Blossom",
    location: "Hoskote–Sidlaghatta Main Road, Bangalore",
    desc1: "Hiland Blossom is a premium DC converted residential layout located on Hoskote–Sidlaghatta Main Road. Surrounded by forest on one side and the Hoskote Industrial Area on the other, it offers a peaceful yet well-connected investment destination.",
    desc2: "Spread across 16 Acres with expansion plans up to 60 Acres and around 272 plots currently, the project is BMRDA approved and designed as a gated villa plot community.",
    features: ["BMRDA Approved", "DC Converted Land", "Villa Plot Gated Community", "30 x 40", "30 x 50", "Odd Sites Available", "Price: ₹1399 / sqft", "Bank Loan Approved by LIC Housing Finance"],
    amenities: ["50ft, 40ft & 30ft Black Top Roads", "Gated Community", "Internal Electricity", "Storm Water Drainage", "Sewerage Treatment Plant", "Overhead Water Tank", "24/7 Security Service", "Landscaped Gardens with Water Bodies", "Children’s Play Area"],
    images: [hiland_blossom_img],
    layout: hiland_blossom_layout,
    locationImage: hiland_blossom_location,
    highlights: ["5 minutes to Hoskote Town", "10 minutes from Budhigere Cross", "30 minutes to Narsapura Industrial Area", "35 minutes to ITPL Whitefield", "45 minutes from Marathahalli", "30 minutes to Devanahalli Business Park", "40 minutes to Bengaluru Aerospace Park", "50 minutes to Kempegowda International Airport"],
  },
  {
    id: 8,
    title: "Hiland Brundavana",
    location: "Factory Circle, Doddaballapura Road, North Bangalore",
    desc1: "Hiland Brundavana is strategically located near the Doddaballapura Industrial Area while also surrounded by lush green landscapes.",
    desc2: "Spread across 4 Acres with only 63 exclusive villa plots, this gated community offers a peaceful residential environment and excellent investment potential.",
    features: ["Villa Plot Gated Community", "30 x 40", "Odd Sites Available", "Price: ₹1820 / sqft"],
    amenities: ["Jogging Track", "Children’s Play Area", "24-Hour Security System", "Landscape & Common Area", "Well-Laid Concrete Roads", "Round-the-Clock Water & Power Supply", "Underground Wiring & Cabling", "Scientifically Designed Sewage Lines"],
    images: [hiland_brundavana_img1, hiland_brundavana_img2],
    locationImage: hiland_brundavana_location,
    layout: hiland_brudavana_layout,
    highlights: ["Textile Park (187 Acres) – 10 Minutes", "Columbia Asia Hospital – 3 Minutes", "S.R.P Hospital – 10 Minutes", "MES College of Pharmacy – 5 Minutes", "Vogue Institute of Fashion Technology – 5 Minutes", "GITAM Engineering University – 10 Minutes", "Railway Station – 5 Minutes", "Kempegowda International Airport – 35 Minutes", "IVC Road – 3 Minutes", "Devanahalli – 30 Minutes", "Rajankunte – 10 Minutes", "Yelahanka New Town – 25 Minutes"],
    statistics: ["Excellent connectivity via roadways, railways and airways in North Bangalore.", "Express Highway, high-speed rail link and mono rail will reduce commute time to airport and prime city locations.", "Government proposed projects include Aerospace Hub, ITIR (Information Technology Investment Region) and Financial City in North Bangalore."],
  },
];

// --- FRAMER MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!selectedProject) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((currentIndex) => {
        if (currentIndex === selectedProject.images.length - 1) {
          return 0;
        } else {
          return currentIndex + 1;
        }
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [selectedProject]);

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setTabValue(0);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleTabChange = (_event: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      id="projects"
      sx={{
        backgroundColor: "#deffcd",
        color: "#000000",
        py: { xs: 6, md: 8 },
        overflow: "hidden", // Prevent scrollbar jumping during animations
      }}
    >
      <Container maxWidth="lg">
        {/* --- TITLE --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "start", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: -2,
                fontFamily: '"Oranienbaum", serif',
              }}
            >
              explore our projects
            </Typography>
          </Box>
        </motion.div>

        {/* --- STAGGERED GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -10 }} // Framer motion physical hover
                onClick={() => handleOpenModal(project)}
                style={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      "& .card-img": { transform: "scale(1.05)" },
                      "& .hover-brief": { transform: "translateY(0)", opacity: 1 },
                    },
                    height: "100%", // Ensures uniform card height
                  }}
                >
                  <Box sx={{ position: "relative", height: "240px", overflow: "hidden" }}>
                    <Box
                      component="img"
                      className="card-img"
                      src={project.images?.[0]}
                      alt={project.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    />

                    {/* Content overlay that slides up inside the card */}
                    <Box
                      className="hover-brief"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                          "linear-gradient(to top, rgba(56, 90, 1, 0.95), rgba(56, 90, 1, 0.7))",
                        color: "white",
                        p: 3,
                        transform: "translateY(100%)",
                        opacity: 0,
                        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.5,
                        }}
                      >
                        {project.desc1}
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          letterSpacing: 1,
                          fontSize: "0.8rem",
                        }}
                      >
                        Read More <ArrowForwardIcon fontSize="small" />
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 2.5, textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        fontFamily: '"Oranienbaum", serif',
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#385A01",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontSize: "0.75rem",
                      }}
                    >
                      {project.location}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* --- PREMIUM MODAL DIALOG --- */}
      <Dialog
        open={!!selectedProject}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            height: { xs: "90vh", md: "85vh" },
            position: "relative",
          },
        }}
      >
        {selectedProject && (
          <>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                zIndex: 50,
                backdropFilter: "blur(4px)",
                "&:hover": { backgroundColor: "black", transform: "scale(1.1)" },
                transition: "all 0.2s ease",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                scrollBehavior: "smooth",
              }}
            >
              {/* --- IMAGE SLIDER HEADER --- */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "250px", md: "350px" },
                  flexShrink: 0,
                  background: "linear-gradient(to bottom, #1a1a1a, #0a0a0a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex} // Reacts to index change to trigger animation
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} image`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0px 10px 30px rgba(0,0,0,0.5))",
                    }}
                  />
                </AnimatePresence>

                {/* Slider Dots */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 24,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: 1.5,
                    zIndex: 5,
                  }}
                >
                  {selectedProject.images.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      sx={{
                        width: currentImageIndex === idx ? 24 : 8,
                        height: 8,
                        borderRadius: "4px",
                        backgroundColor:
                          currentImageIndex === idx
                            ? "white"
                            : "rgba(255,255,255,0.4)",
                        transition: "all 0.4s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* --- STICKY TABS --- */}
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 40,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderBottom: 1,
                  borderColor: "divider",
                  px: { xs: 2, md: 5 },
                  pt: 1,
                  flexShrink: 0,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    "& .MuiTab-root": {
                      fontWeight: 700,
                      color: "text.secondary",
                      fontSize: "1rem",
                      textTransform: "none",
                      transition: "all 0.2s ease",
                    },
                    "& .Mui-selected": { color: "#385A01 !important" },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#385A01",
                      height: 3,
                    },
                  }}
                >
                  <Tab label="Overview" />
                  <Tab label="Layout Plans" />
                  <Tab label="Location" />
                </Tabs>
              </Box>

              {/* --- ANIMATED TAB CONTENT --- */}
              <Box sx={{ p: { xs: 3, md: 5 }, flexGrow: 1 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tabValue} // This key forces Framer Motion to animate when tabValue changes
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* TAB 0: OVERVIEW */}
                    {tabValue === 0 && (
                      <Box>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 800,
                            fontFamily: '"Oranienbaum", serif',
                            mb: 1,
                          }}
                        >
                          {selectedProject.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#385A01",
                            fontWeight: 700,
                            mb: 4,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          {selectedProject.location}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 4,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "text.secondary",
                                lineHeight: 1.8,
                                mb: 2,
                              }}
                            >
                              {selectedProject.desc1}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "text.secondary",
                                lineHeight: 1.8,
                                mb: 4,
                              }}
                            >
                              {selectedProject.desc2}
                            </Typography>

                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                              Plot Features
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                                mb: { xs: 4, md: 0 },
                              }}
                            >
                              {selectedProject.features.map((label, i) => (
                                <Chip
                                  key={i}
                                  label={label}
                                  sx={{
                                    borderRadius: "8px",
                                    fontWeight: 700,
                                    backgroundColor: "#deffcd",
                                    color: "#385A01",
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                              Premium Amenities
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              {selectedProject.amenities.map((amenity, i) => (
                                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: 28,
                                      height: 28,
                                      borderRadius: "50%",
                                      backgroundColor: "#385A01",
                                      color: "white",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <CheckIcon sx={{ fontSize: "16px" }} />
                                  </Box>
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 600, color: "text.secondary" }}
                                  >
                                    {amenity}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>

                            {selectedProject.highlights && (
                              <>
                                <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                                  Key Highlights
                                </Typography>
                                <Box sx={{ display: "grid", gap: 1 }}>
                                  {selectedProject.highlights.map((item, i) => (
                                    <Typography key={i} variant="body2" color="text.secondary">
                                      • {item}
                                    </Typography>
                                  ))}
                                </Box>
                              </>
                            )}

                            {selectedProject.statistics && (
                              <>
                                <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
                                  North Bangalore Growth
                                </Typography>
                                <Box sx={{ display: "grid", gap: 1 }}>
                                  {selectedProject.statistics.map((item, i) => (
                                    <Typography key={i} variant="body2" color="text.secondary">
                                      • {item}
                                    </Typography>
                                  ))}
                                </Box>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {/* TAB 1: LAYOUT PLANS */}
                    {tabValue === 1 && (
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                          Master Layout Plan
                        </Typography>

                        {selectedProject.layout ? (
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            {(Array.isArray(selectedProject.layout)
                              ? selectedProject.layout
                              : [selectedProject.layout]
                            ).map((img, i) => (
                              <Box
                                key={i}
                                component="img"
                                src={img}
                                alt="Layout Plan"
                                sx={{
                                  width: "100%",
                                  height: "auto",
                                  maxHeight: "80vh",
                                  objectFit: "contain",
                                  borderRadius: "16px",
                                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                                }}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body1" color="text.secondary">
                            Layout plans are currently not available for this project.
                          </Typography>
                        )}
                      </Box>
                    )}

                    {/* TAB 2: LOCATION MAPS */}
                    {tabValue === 2 && (
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                          <LocationOnIcon sx={{ color: "#385A01" }} />
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Project Location
                          </Typography>
                        </Box>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                          Located strategically in {selectedProject.location}, ensuring high appreciation and excellent connectivity. Positioned in a rapidly developing corridor with strong future growth potential.
                        </Typography>

                        <Box
                          sx={{
                            width: "100%",
                            height: "400px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {selectedProject.mapUrl ? (
                            <iframe
                              src={selectedProject.mapUrl}
                              title="Project Map"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              loading="lazy"
                            />
                          ) : selectedProject.locationImage ? (
                            <Box
                              component="img"
                              src={selectedProject.locationImage}
                              alt="Project Location"
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          ) : (
                            <Typography variant="body1" color="text.secondary">
                              Location map is currently not available.
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Projects;

// import { useState, useEffect, useRef, forwardRef } from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   Chip,
//   Dialog,
//   IconButton,
//   Slide,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import CheckIcon from "@mui/icons-material/Check";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { keyframes } from "@mui/system";

// //Project Images
// import hiland_nest_img from "../assets/project1.png"
// import epi_heritage_img from "../assets/epi_heritage.png"
// import hiland_encalve_img from "../assets/hiland_enclave.png"
// import hiland_serence from "../assets/hiland_serence.png"
// import hiland_blossom_img from "../assets/hiland_blossom.png"
// import hiland_brundavana_img1 from '../assets/hiland_brundavana_1.png'
// import hiland_brundavana_img2 from '../assets/hiland_brundavana_2.png'

// //Layout Images
// import hiland_nest_layout_img from "../assets/hiland_nest_layout.png"
// import epi_heritage_layout_img from "../assets/epi_heritage_layout.png"
// import hiland_blossom_layout from '../assets/hiland_blossom_layout.png'
// import hiland_brudavana_layout from '../assets/hiland_brudavana_layout.png'

// //Map Images
// import epi_heritage_map_img from "../assets/epi_heritage_location.png"
// import hiland_blossom_location from '../assets/hiland_blossom_location.png'
// import hiland_brundavana_location from "../assets/hiland_brudavana_location.png"

// // --- ANIMATIONS ---
// const fadeSlideUp = keyframes`
//   0% { opacity: 0; transform: translateY(40px); }
//   100% { opacity: 1; transform: translateY(0); }
// `;

// // --- MODAL TRANSITION ---
// const Transition = forwardRef(function Transition(
//   props: any,
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// // --- PROJECT DATA ---
// const projectsData = [
//   {
//     id: 1,
//     title: "Hiland Nest",
//     location: "M S Palya, Guniagrahara, Bangalore",

//     desc1:
//       "Nest is a gated community within city limits in Bangalore near M S Palya at Guniagrahara with modern amenities.",

//     desc2:
//       "This meticulously designed residential layout spread over 2 Acres 15 Guntas is located 23 km from M.G. Road and 8 km from BEL Circle.",

//     features: ["DC Converted", "30 x 40", "30 x 50", "40 x 60"],

//     amenities: [
//       "Round-the-Clock Water Supply",
//       "24/7 Power Supply",
//       "Well-Designed Sewage Lines",
//       "Well-Laid Roads",
//     ],

//     images: [ hiland_nest_img ],

//     layout : [hiland_nest_layout_img],

//     mapUrl:
//       "https://www.google.com/maps?q=12.985946,77.579551&z=15&output=embed",
//   },
//   {
//     id: 2,
//     title: "EPI Heritage",
//     location: "Near ITC Factory, Bangalore International Airport Road",

//     desc1:
//       "EPI Heritage is a meticulously designed residential layout spread over 9 Acres 15 Guntas in North Bangalore.",

//     desc2:
//       "Located 29 km from M.G. Road and well connected by the six-lane NH7 (Bangalore–Hyderabad Highway). The upcoming Bangalore International Airport is approximately 7 km away, making it a prime investment destination.",

//     features: [
//       "BIAAPA Approved",
//       "LIC Housing Finance Approved",
//       "30 x 50",
//       "40 x 50",
//       "40 x 60",
//     ],

//     amenities: [
//       "Free Club Membership",
//       "Round-the-Clock Water & Power Supply",
//       "24-Hour Security",
//       "Landscape & Common Area",
//       "Well-Laid Concrete Roads",
//       "Children Play Area",
//     ],

//     images: [epi_heritage_img],

//     layout : [epi_heritage_layout_img],

//     locationImage: epi_heritage_map_img,
//   },
//   {
//     id: 3,
//     title: "Hiland Enclave",
//     location:
//       "Near Vijayapura Town, close to the upcoming International Airport",

//     desc1:
//       "Hiland Enclave is a thoughtfully planned residential layout located near Vijayapura town close to the upcoming International Airport.",

//     desc2:
//       "Spread across 7 Acres 15 Guntas with 114 sites, this project offers a great investment opportunity with access to hospitals, schools, colleges, supermarkets, railway and bus stations nearby.",

//     features: [
//       "Axis Bank Approved",
//       "IDBI Bank Approved",
//       "30 x 40",
//       "30 x 50",
//       "40 x 60",
//       "Flexible Investment Options",
//     ],

//     amenities: [
//       "Park Area with Jogging Track",
//       "Round-the-Clock Water & Power Supply",
//       "24-Hour Security",
//       "Children Play Area",
//       "Well-Designed Sewage Lines",
//       "Well-Laid Roads",
//     ],

//     images: [hiland_encalve_img],

//     // locationImage: projectImg1,
//   },
//   {
//     id: 4,
//     title: "Hiland Serene",
//     location: "Near Bangalore International Airport",

//     desc1:
//       "Hiland Serene is an exclusive residential project designed for investors seeking high returns with low investment.",

//     desc2:
//       "Spread across 11 Acres 5 Guntas with around 179 sites, the project offers excellent connectivity and is located just minutes away from the New Bangalore International Airport.",

//     features: [
//       "DTCP Approved",
//       "Approved by DHFL",
//       "30 x 40",
//       "30 x 50",
//       "40 x 60",
//     ],

//     amenities: [
//       "Jogging Track",
//       "Children Play Area",
//       "24-Hour Security System",
//       "Landscape & Common Area",
//       "Well-Laid Concrete Roads",
//       "Round-the-Clock Water & Power Supply",
//       "Underground Wiring & Cabling",
//     ],

//     images: [hiland_serence],
//   },
//   {
//     id: 7,
//     title: "Hiland Blossom",
//     location: "Hoskote–Sidlaghatta Main Road, Bangalore",

//     desc1:
//       "Hiland Blossom is a premium DC converted residential layout located on Hoskote–Sidlaghatta Main Road. Surrounded by forest on one side and the Hoskote Industrial Area on the other, it offers a peaceful yet well-connected investment destination.",

//     desc2:
//       "Spread across 16 Acres with expansion plans up to 60 Acres and around 272 plots currently, the project is BMRDA approved and designed as a gated villa plot community.",

//     features: [
//       "BMRDA Approved",
//       "DC Converted Land",
//       "Villa Plot Gated Community",
//       "30 x 40",
//       "30 x 50",
//       "Odd Sites Available",
//       "Price: ₹1399 / sqft",
//       "Bank Loan Approved by LIC Housing Finance",
//     ],

//     amenities: [
//       "50ft, 40ft & 30ft Black Top Roads",
//       "Gated Community",
//       "Internal Electricity",
//       "Storm Water Drainage",
//       "Sewerage Treatment Plant",
//       "Overhead Water Tank",
//       "24/7 Security Service",
//       "Landscaped Gardens with Water Bodies",
//       "Children’s Play Area",
//     ],

//     images: [hiland_blossom_img],

//     layout : hiland_blossom_layout,

//     locationImage: hiland_blossom_location,

//     highlights: [
//       "5 minutes to Hoskote Town",
//       "10 minutes from Budhigere Cross",
//       "30 minutes to Narsapura Industrial Area",
//       "35 minutes to ITPL Whitefield",
//       "45 minutes from Marathahalli",
//       "30 minutes to Devanahalli Business Park",
//       "40 minutes to Bengaluru Aerospace Park",
//       "50 minutes to Kempegowda International Airport",
//     ],
//   },
//   {
//     id: 8,
//     title: "Hiland Brundavana",
//     location: "Factory Circle, Doddaballapura Road, North Bangalore",

//     desc1:
//       "Hiland Brundavana is strategically located near the Doddaballapura Industrial Area while also surrounded by lush green landscapes.",

//     desc2:
//       "Spread across 4 Acres with only 63 exclusive villa plots, this gated community offers a peaceful residential environment and excellent investment potential.",

//     features: [
//       "Villa Plot Gated Community",
//       "30 x 40",
//       "Odd Sites Available",
//       "Price: ₹1820 / sqft",
//     ],

//     amenities: [
//       "Jogging Track",
//       "Children’s Play Area",
//       "24-Hour Security System",
//       "Landscape & Common Area",
//       "Well-Laid Concrete Roads",
//       "Round-the-Clock Water & Power Supply",
//       "Underground Wiring & Cabling",
//       "Scientifically Designed Sewage Lines",
//     ],

//     images: [hiland_brundavana_img1,hiland_brundavana_img2],

//     locationImage: hiland_brundavana_location,

//     layout : hiland_brudavana_layout,

//     highlights: [
//       "Textile Park (187 Acres) – 10 Minutes",
//       "Columbia Asia Hospital – 3 Minutes",
//       "S.R.P Hospital – 10 Minutes",
//       "MES College of Pharmacy – 5 Minutes",
//       "Vogue Institute of Fashion Technology – 5 Minutes",
//       "GITAM Engineering University – 10 Minutes",
//       "Railway Station – 5 Minutes",
//       "Kempegowda International Airport – 35 Minutes",
//       "IVC Road – 3 Minutes",
//       "Devanahalli – 30 Minutes",
//       "Rajankunte – 10 Minutes",
//       "Yelahanka New Town – 25 Minutes",
//     ],

//     statistics: [
//       "Excellent connectivity via roadways, railways and airways in North Bangalore.",
//       "Express Highway, high-speed rail link and mono rail will reduce commute time to airport and prime city locations.",
//       "Government proposed projects include Aerospace Hub, ITIR (Information Technology Investment Region) and Financial City in North Bangalore.",
//     ],
//   },
// ];

// const Projects = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const [selectedProject, setSelectedProject] = useState<
//     (typeof projectsData)[0] | null
//   >(null);
//   const [tabValue, setTabValue] = useState(0);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     if (!selectedProject) return;

//     const timer = setInterval(() => {
//       setCurrentImageIndex((currentIndex) => {
//         if (currentIndex === selectedProject.images.length - 1) {
//           return 0;
//         } else {
//           return currentIndex + 1;
//         }
//       });
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [selectedProject]);

//   const handleOpenModal = (project: any) => {
//     setSelectedProject(project);
//     setTabValue(0);
//     setCurrentImageIndex(0);
//   };

//   const handleCloseModal = () => {
//     setSelectedProject(null);
//   };

//   const handleTabChange = (event: any, newValue: number) => {
//     setTabValue(newValue);
//   };

//   useEffect(() => {
//     const watcher = new IntersectionObserver(
//       (entries) => {
//         const ourSection = entries[0];

//         if (ourSection.isIntersecting) {
//           setIsVisible(true);
//           watcher.disconnect();
//         }
//       },
//       {
//         threshold: 0.15,
//       },
//     );

//     if (sectionRef.current) {
//       watcher.observe(sectionRef.current);
//     }

//     return () => watcher.disconnect();
//   }, []);

//   return (
//     <Box
//       id="projects"
//       ref={sectionRef}
//       sx={{
//         backgroundColor: "#deffcd",
//         color: "#000000",
//         py: { xs: 6, md: 8 },
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             textAlign: "start",
//             mb: 6,
//             opacity: isVisible ? 1 : 0,
//             animation: isVisible
//               ? `${fadeSlideUp} 0.8s ease-out forwards`
//               : "none",
//           }}
//         >
//           <Typography
//             variant="h3"
//             component="h2"
//             sx={{
//               fontWeight: 400,
//               textTransform: "uppercase",
//               letterSpacing: -2,
//               fontFamily: '"Oranienbaum", serif',
//             }}
//           >
//             explore our projects
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//             },
//             gap: { xs: 3, md: 4 },
//           }}
//         >
//           {projectsData.map((project, index) => (
//             <Box
//               key={project.id}
//               onClick={() => handleOpenModal(project)}
//               sx={{
//                 backgroundColor: "white",
//                 borderRadius: "20px",
//                 overflow: "hidden",
//                 cursor: "pointer",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//                 transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
//                 opacity: isVisible ? 1 : 0,
//                 animation: isVisible
//                   ? `${fadeSlideUp} 0.8s ease-out forwards`
//                   : "none",
//                 animationDelay: `${index * 0.15}s`,
//                 "&:hover": {
//                   transform: "translateY(-10px)",
//                   boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
//                   "& .card-img": { transform: "scale(1.05)" },
//                   "& .hover-brief": { transform: "translateY(0)", opacity: 1 },
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "relative",
//                   height: "240px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   component="img"
//                   className="card-img"
//                   src={project.images?.[0]}
//                   alt={project.title}
//                   sx={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     transition: "transform 0.5s ease",
//                   }}
//                 />

//                 <Box
//                   className="hover-brief"
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     background:
//                       "linear-gradient(to top, rgba(56, 90, 1, 0.95), rgba(56, 90, 1, 0.7))",
//                     color: "white",
//                     p: 3,
//                     transform: "translateY(100%)",
//                     opacity: 0,
//                     transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "flex-end",
//                     height: "100%",
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       mb: 1.5,
//                       display: "-webkit-box",
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       lineHeight: 1.5,
//                     }}
//                   >
//                     {project.desc1}
//                   </Typography>
//                   <Typography
//                     variant="button"
//                     sx={{
//                       fontWeight: 800,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       letterSpacing: 1,
//                       fontSize: "0.8rem",
//                     }}
//                   >
//                     Read More <ArrowForwardIcon fontSize="small" />
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ p: 2.5, textAlign: "center" }}>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: 800,
//                     mb: 0.5,
//                     fontFamily: '"Oranienbaum", serif',
//                   }}
//                 >
//                   {project.title}
//                 </Typography>
//                 <Typography
//                   variant="subtitle2"
//                   sx={{
//                     color: "#385A01",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 1,
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   {project.location}
//                 </Typography>
//               </Box>
//             </Box>
//           ))}
//         </Box>
//       </Container>

//       <Dialog
//         open={!!selectedProject}
//         onClose={handleCloseModal}
//         TransitionComponent={Transition}
//         maxWidth="lg"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: "20px",
//             backgroundColor: "#ffffff",
//             overflow: "hidden",
//             height: { xs: "90vh", md: "85vh" },
//             position: "relative",
//           },
//         }}
//       >
//         {selectedProject && (
//           <>
//             <IconButton
//               onClick={handleCloseModal}
//               sx={{
//                 position: "absolute",
//                 top: 16,
//                 right: 16,
//                 backgroundColor: "rgba(0,0,0,0.5)",
//                 color: "white",
//                 zIndex: 50,
//                 backdropFilter: "blur(4px)",
//                 "&:hover": { backgroundColor: "black" },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>

//             <Box
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 overflowY: "auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 scrollBehavior: "smooth",
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "relative",
//                   height: { xs: "250px", md: "300px" },
//                   flexShrink: 0,
//                   background: "linear-gradient(to bottom, #1a1a1a, #0a0a0a)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 {selectedProject.images.map((img, idx) => (
//                   <Box
//                     key={idx}
//                     component="img"
//                     src={img}
//                     alt={`${selectedProject.title} image ${idx + 1}`}
//                     sx={{
//                       position: "absolute",
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       opacity: currentImageIndex === idx ? 1 : 0,
//                       transition: "opacity 1s ease-in-out",
//                       filter: "drop-shadow(0px 10px 30px rgba(0,0,0,0.5))",
//                     }}
//                   />
//                 ))}

//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 24,
//                     left: 0,
//                     right: 0,
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 1,
//                     zIndex: 5,
//                   }}
//                 >
//                   {selectedProject.images.map((_, idx) => (
//                     <Box
//                       key={idx}
//                       sx={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: "50%",
//                         backgroundColor:
//                           currentImageIndex === idx
//                             ? "white"
//                             : "rgba(255,255,255,0.3)",
//                         transition: "all 0.3s ease",
//                         boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 40,
//                   backgroundColor: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(10px)",
//                   borderBottom: 1,
//                   borderColor: "divider",
//                   px: { xs: 2, md: 5 },
//                   pt: 1,
//                   flexShrink: 0,
//                 }}
//               >
//                 <Tabs
//                   value={tabValue}
//                   onChange={handleTabChange}
//                   variant="scrollable"
//                   scrollButtons="auto"
//                   sx={{
//                     "& .MuiTab-root": {
//                       fontWeight: 700,
//                       color: "text.secondary",
//                       fontSize: "1rem",
//                       textTransform: "none",
//                     },
//                     "& .Mui-selected": { color: "#385A01 !important" },
//                     "& .MuiTabs-indicator": {
//                       backgroundColor: "#385A01",
//                       height: 3,
//                     },
//                   }}
//                 >
//                   <Tab label="Overview" />
//                   <Tab label="Layout Plans" />
//                   <Tab label="Location" />
//                 </Tabs>
//               </Box>

//               <Box sx={{ p: { xs: 3, md: 5 } }}>
//                 {tabValue === 0 && (
//                   <Box sx={{ animation: `${fadeSlideUp} 0.4s ease-out` }}>
//                     <Typography
//                       variant="h3"
//                       sx={{
//                         fontWeight: 800,
//                         fontFamily: '"Oranienbaum", serif',
//                         mb: 1,
//                       }}
//                     >
//                       {selectedProject.title}
//                     </Typography>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: "#385A01",
//                         fontWeight: 700,
//                         mb: 4,
//                         textTransform: "uppercase",
//                         letterSpacing: 1,
//                       }}
//                     >
//                       {selectedProject.location}
//                     </Typography>

//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: { xs: "column", md: "row" },
//                         gap: 4,
//                       }}
//                     >
//                       <Box sx={{ flex: 1 }}>
//                         <Typography
//                           variant="body1"
//                           sx={{
//                             color: "text.secondary",
//                             lineHeight: 1.8,
//                             mb: 2,
//                           }}
//                         >
//                           {selectedProject.desc1}
//                         </Typography>
//                         <Typography
//                           variant="body1"
//                           sx={{
//                             color: "text.secondary",
//                             lineHeight: 1.8,
//                             mb: 4,
//                           }}
//                         >
//                           {selectedProject.desc2}
//                         </Typography>

//                         <Typography
//                           variant="h6"
//                           sx={{ fontWeight: 700, mb: 2 }}
//                         >
//                           Plot Features
//                         </Typography>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             gap: 1,
//                             flexWrap: "wrap",
//                             mb: { xs: 4, md: 0 },
//                           }}
//                         >
//                           {selectedProject.features.map((label, i) => (
//                             <Chip
//                               key={i}
//                               label={label}
//                               sx={{
//                                 borderRadius: "8px",
//                                 fontWeight: 700,
//                                 backgroundColor: "#deffcd",
//                                 color: "#385A01",
//                               }}
//                             />
//                           ))}
//                         </Box>
//                       </Box>

//                       <Box sx={{ flex: 1 }}>
//                         <Typography
//                           variant="h6"
//                           sx={{ fontWeight: 700, mb: 2 }}
//                         >
//                           Premium Amenities
//                         </Typography>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,
//                           }}
//                         >
//                           {selectedProject.amenities.map((amenity, i) => (
//                             <Box
//                               key={i}
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 2,
//                               }}
//                             >
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                   width: 28,
//                                   height: 28,
//                                   borderRadius: "50%",
//                                   backgroundColor: "#385A01",
//                                   color: "white",
//                                   flexShrink: 0,
//                                 }}
//                               >
//                                 <CheckIcon sx={{ fontSize: "16px" }} />
//                               </Box>
//                               <Typography
//                                 variant="body1"
//                                 sx={{
//                                   fontWeight: 600,
//                                   color: "text.secondary",
//                                 }}
//                               >
//                                 {amenity}
//                               </Typography>
//                             </Box>
//                           ))}
//                         </Box>

//                         {selectedProject.highlights && (
//                           <>
//                             <Typography
//                               variant="h6"
//                               sx={{ fontWeight: 700, mt: 4, mb: 2 }}
//                             >
//                               Key Highlights
//                             </Typography>

//                             <Box sx={{ display: "grid", gap: 1 }}>
//                               {selectedProject.highlights.map((item, i) => (
//                                 <Typography key={i} variant="body2">
//                                   • {item}
//                                 </Typography>
//                               ))}
//                             </Box>
//                           </>
//                         )}

//                         {selectedProject.statistics && (
//                           <>
//                             <Typography
//                               variant="h6"
//                               sx={{ fontWeight: 700, mt: 4, mb: 2 }}
//                             >
//                               North Bangalore Growth
//                             </Typography>

//                             <Box sx={{ display: "grid", gap: 1 }}>
//                               {selectedProject.statistics.map((item, i) => (
//                                 <Typography key={i} variant="body2">
//                                   • {item}
//                                 </Typography>
//                               ))}
//                             </Box>
//                           </>
//                         )}
//                       </Box>
//                     </Box>
//                   </Box>
//                 )}

//                 {/* --- UPDATED TAB 1: LAYOUT PLANS --- */}
//                 {tabValue === 1 && (
//                   <Box sx={{ animation: `${fadeSlideUp} 0.4s ease-out` }}>
//                     <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
//                       Master Layout Plan
//                     </Typography>

//                     {selectedProject.layout ? (
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           gap: 4,
//                         }}
//                       >
//                         {/* Ensure layout is always an array so we can map over it */}
//                         {(Array.isArray(selectedProject.layout)
//                           ? selectedProject.layout
//                           : [selectedProject.layout]
//                         ).map((img, i) => (
//                           <Box
//                             key={i}
//                             component="img"
//                             src={img}
//                             alt="Layout Plan"
//                             sx={{
//                               width: "100%",
//                               height: "auto", // Allows image to keep its aspect ratio
//                               maxHeight: "80vh", // Prevents extremely tall images from taking over
//                               objectFit: "contain", // Makes sure nothing is cropped
//                               borderRadius: "16px",
//                               boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//                             }}
//                           />
//                         ))}
//                       </Box>
//                     ) : (
//                       <Typography variant="body1" color="text.secondary">
//                         Layout plans are currently not available for this project.
//                       </Typography>
//                     )}
//                   </Box>
//                 )}

//                 {/* --- UPDATED TAB 2: LOCATION MAPS --- */}
//                 {tabValue === 2 && (
//                   <Box sx={{ animation: `${fadeSlideUp} 0.4s ease-out` }}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         mb: 3,
//                       }}
//                     >
//                       <LocationOnIcon sx={{ color: "#385A01" }} />
//                       <Typography variant="h5" sx={{ fontWeight: 700 }}>
//                         Project Location
//                       </Typography>
//                     </Box>

//                     <Typography
//                       variant="body1"
//                       color="text.secondary"
//                       sx={{ mb: 4 }}
//                     >
//                       Located strategically in {selectedProject.location},
//                       ensuring high appreciation and excellent connectivity.
//                     </Typography>

//                     <Box
//                       sx={{
//                         width: "100%",
//                         height: "400px",
//                         borderRadius: "16px",
//                         overflow: "hidden",
//                         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                         backgroundColor: "#f5f5f5", // Fallback color
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center"
//                       }}
//                     >
//                       {selectedProject.mapUrl ? (
//                         <iframe
//                           src={selectedProject.mapUrl}
//                           title="Project Map"
//                           width="100%"
//                           height="100%"
//                           style={{ border: 0 }}
//                           loading="lazy"
//                         />
//                       ) : selectedProject.locationImage ? (
//                         <Box
//                           component="img"
//                           src={selectedProject.locationImage}
//                           alt="Project Location"
//                           sx={{
//                             width: "100%",
//                             height: "auto", // Allows image to keep its aspect ratio
//                             maxHeight: "80vh", // Prevents extremely tall images from taking over
//                             objectFit: "contain", // Makes sure nothing is cropped
//                           }}
//                         />
//                       ) : (
//                         <Typography variant="body1" color="text.secondary">
//                           Location map is currently not available.
//                         </Typography>
//                       )}
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default Projects;