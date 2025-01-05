import { Box, Typography } from "@mui/material";
import FullWidthDropdownMenu from "./FullWidthDropdownMenu";
import HeaderButton from "./HeaderButton";
import { useMediaQuery } from "@mui/material";

export default function Header() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const menuItems = ["O me", "Rezervace", "Kontak"];

  return (
    <Box
      sx={{
        bgcolor: "black",
        width: "100vw",
        color: "white",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: isSmallScreen ? "flex-start" : "space-between",
        alignItems: isSmallScreen ? "center" : "center",
        px: 2,
        py: isSmallScreen ? 1 : 0,
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: isSmallScreen ? 1 : 0,
        }}
      >
        Naty The Stylist
      </Typography>

      {/* Buttons or Dropdown */}
      {isSmallScreen ? (
        <FullWidthDropdownMenu menuItems={menuItems} />
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          <HeaderButton text="O me" />
          <HeaderButton text="Rezervace" />
          <HeaderButton text="Kontak" />
        </Box>
      )}
    </Box>
  );
}
