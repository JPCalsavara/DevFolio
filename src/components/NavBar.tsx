"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import { navTopics, profileData } from "@/data/portfolioData";
import { usePortfolioTheme } from "@/theme/AppThemeProvider";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { currentPreset, setPreset, availablePresets } = usePortfolioTheme();
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);

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
              decoding="async"
              sx={{ width: 30, height: 30 }}
            />
            <Typography sx={{ fontWeight: 800 }}>{profileData.name}</Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navTopics.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                component={Link}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
            <Button
              size="small"
              onClick={(e) => setThemeAnchor(e.currentTarget)}
              variant="outlined"
              color="inherit"
              startIcon={<PaletteRoundedIcon fontSize="small" />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.82rem",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              {availablePresets.find((p) => p.id === currentPreset)?.label || "Tema"}
            </Button>
            <Button
              href="/admin"
              component={Link}
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

      <Menu
        anchorEl={themeAnchor}
        open={Boolean(themeAnchor)}
        onClose={() => setThemeAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 2,
              backgroundColor: "background.paper",
              border: "1px solid rgba(255,255,255,0.12)",
              minWidth: 180,
            },
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 0.8,
            color: "text.secondary",
            display: "block",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          TEMA VISUAL
        </Typography>
        {availablePresets.map((opt) => (
          <MenuItem
            key={opt.id}
            selected={opt.id === currentPreset}
            onClick={() => {
              setPreset(opt.id);
              setThemeAnchor(null);
            }}
            sx={{ display: "flex", alignItems: "center", gap: 1.2, py: 1 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: opt.primaryColor,
              }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: opt.id === currentPreset ? 800 : 500 }}
            >
              {opt.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

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
                key={item.label}
                href={item.href}
                component={Link}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Button>
            ))}
            <Button
              href="/admin"
              component={Link}
              variant="contained"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Admin
            </Button>

            <Box sx={{ pt: 2, mt: 1, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  mb: 1,
                  fontWeight: 700,
                }}
              >
                TEMA VISUAL
              </Typography>
              <Stack spacing={0.8}>
                {availablePresets.map((opt) => (
                  <Button
                    key={opt.id}
                    size="small"
                    variant={opt.id === currentPreset ? "contained" : "outlined"}
                    color={opt.id === currentPreset ? "primary" : "inherit"}
                    onClick={() => {
                      setPreset(opt.id);
                      setOpen(false);
                    }}
                    startIcon={
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: opt.primaryColor,
                        }}
                      />
                    }
                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  >
                    {opt.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
