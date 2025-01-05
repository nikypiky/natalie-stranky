import React, { useState } from "react";
import {IconButton, List, ListItem, ListItemText, Drawer } from "@mui/material";
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
            height: "100vh",
            bgcolor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{
            color: "white",
            position: "absolute",
            top: 16,
            right: 16,
          }}
          onClick={toggleDrawer(false)}
        >
          <CloseIcon />
        </IconButton>

        {/* Centered Menu Items */}
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Horizontal centering
            gap: 2, // Adds spacing between items
          }}
        >
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: "center", // Centers the text horizontally
                width: "100%", // Ensures full-width clickable area
                textAlign: "center", // Ensures text alignment
              }}
              button
              onClick={toggleDrawer(false)}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  variant: "h6", // Makes the text larger for better visibility
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default FullWidthDropdownMenu;
