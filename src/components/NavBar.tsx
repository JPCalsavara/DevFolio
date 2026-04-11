"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { navTopics } from "@/data/portfolioData";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(125,211,252,0.12)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", minHeight: 74 }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Box
              component="img"
              src="/images/icons/screen-svgrepo-com.svg"
              alt="logo"
              sx={{ width: 30, height: 30 }}
            />
            <Typography sx={{ fontWeight: 800 }}>João Calsavara</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navTopics.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                component="a"
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
            <Button
              href="/admin"
              component="a"
              variant="outlined"
              color="secondary"
            >
              Admin
            </Button>
          </Stack>

          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2.5 }}>
          <Stack
            direction="row"
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>Menu</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={1}>
            {navTopics.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                component="a"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Button>
            ))}
            <Button
              href="/admin"
              component="a"
              variant="contained"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Admin
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
