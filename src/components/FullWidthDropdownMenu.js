import React, { useState } from "react";
import { Box, IconButton, List, ListItem, ListItemText, Drawer, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const FullWidthDropdownMenu = ({ menuItems }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100vw",
            maxHeight: "50vh", // Open menu below the button and limit height
            bgcolor: "black",
            color: "white",
            borderTop: "1px solid white", // Optional border styling
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
          }}
        >
          {/* Close Button */}
          <IconButton
            sx={{ color: "white", alignSelf: "flex-end", mr: 2 }}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>

          {/* Menu Items */}
          <List sx={{ textAlign: "center", width: "100%" }}>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={toggleDrawer(false)}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default FullWidthDropdownMenu;
