import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

const liquidAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "#home" },
    { label: "About", path: "#about" },
    { label: "Projects", path: "#projects" },
    { label: "Reviews", path: "#reviews" },
    { label: "Contact", path: "#footer" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (e: any, path: any) => {
    e.preventDefault();

    if (mobileOpen) {
      setMobileOpen(false);
    }

    const targetId = path.replace("#", "");

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: targetId } });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <List sx={{ width: "100%", textAlign: "center", mb: 4 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.path}
              onClick={(e) => handleNavClick(e as any, item.path)}
              sx={{
                justifyContent: "center",
                borderRadius: "16px",
                mb: 2,
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        component="a"
        href="#footer"
        onClick={(e) => handleNavClick(e as any, "#footer")}
        sx={{
          borderRadius: "30px",
          px: 6,
          py: 2,
          fontSize: "1.2rem",
          fontWeight: "bold",
          textTransform: "none",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Book Now
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 20,
          left: 0,
          right: 0,
          borderRadius: "32px",
          width: "85dvw",
          m: "auto",
          p: { md: 0.5, xs: 0.2 },
          zIndex: 1200,
          background:
            "linear-gradient(270deg, rgba(255, 255, 255, 0.4), rgba(240, 248, 255, 0.7), rgba(255, 255, 255, 0.4))",
          backgroundSize: "400% 400%",
          animation: `${liquidAnimation} 10s ease-in-out infinite`,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              padding: "0 !important",
              minHeight: "70px",
            }}
          >
            <Box
              component="a"
              href="#home"
              onClick={(e) => handleNavClick(e as any, "#home")}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Hiland Realty"
                sx={{
                  height: { xs: 50, md: 60 },
                  width: "auto",
                  marginRight: 2,
                  padding: "2px",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component="a"
                  href={item.path}
                  onClick={(e) => handleNavClick(e as any, item.path)}
                  sx={{
                    color: "text.primary",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      color: "#385A01",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                variant="contained"
                component="a"
                href="#footer"
                onClick={(e) => handleNavClick(e as any, "#footer")}
                sx={{
                  ml: 2,
                  borderRadius: "24px",
                  px: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "black",
                }}
              >
                Book Now
              </Button>
            </Box>

            {/* --- ANIMATED HAMBURGER ICON --- */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.4s ease-in-out",
                  transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {mobileOpen ? (
                  <CloseIcon fontSize="large" sx={{ color: "black" }} />
                ) : (
                  <MenuIcon fontSize="large" sx={{ color: "black" }} />
                )}
              </Box>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* --- FULL SCREEN BOTTOM-UP DRAWER --- */}
      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: 1100,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "100dvh",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
