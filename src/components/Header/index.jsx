import styles from "@/styles/Home.module.scss";

import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

import { Fingerprint, PictureAsPdf } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import { Container, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <PictureAsPdf sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 0,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Talking PDF
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
