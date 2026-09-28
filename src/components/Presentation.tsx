import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { profileData } from "@/data/portfolioData";

export default function Presentation() {
  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        pt: { xs: 10, md: 12 },
        pb: { xs: 5, md: 6 },
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 15% 20%, var(--aura-1), transparent 30%), radial-gradient(circle at 85% 75%, var(--aura-2), transparent 28%), linear-gradient(180deg, var(--bg-default) 0%, var(--bg-paper) 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, var(--aura-1), transparent 45%, var(--aura-2) 70%, transparent)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2.4} sx={{ maxWidth: 980 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 4,
              color: "secondary.main",
              fontWeight: 700,
            }}
          >
            {profileData.presentationOverline || `PORTFÓLIO / ${profileData.name.toUpperCase()}`}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "3rem", sm: "4rem", md: "5.5rem" },
              lineHeight: 0.95,
              maxWidth: 900,
            }}
          >
            {profileData.headline}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              maxWidth: 760,
            }}
          >
            {profileData.bio}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              href="#projetos"
              component="a"
              variant="contained"
              color="primary"
              size="large"
            >
              Explorar projetos
            </Button>
            <Button
              href="#contato"
              component="a"
              variant="outlined"
              color="secondary"
              size="large"
            >
              Entrar em contato
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
