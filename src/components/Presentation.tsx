import { Box, Button, Container, Stack, Typography } from "@mui/material";

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
          "radial-gradient(circle at 15% 20%, rgba(92,156,255,0.22), transparent 28%), radial-gradient(circle at 85% 75%, rgba(125,211,252,0.18), transparent 26%), linear-gradient(180deg, rgba(10,20,36,0.96) 0%, rgba(7,17,31,0.98) 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(92,156,255,0.08), transparent 45%, rgba(125,211,252,0.05) 70%, transparent)",
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
            PORTFÓLIO / JOÃO CALSAVARA
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "3rem", sm: "4rem", md: "5.5rem" },
              lineHeight: 0.95,
              maxWidth: 900,
            }}
          >
            Backend, cloud e software de alto impacto.
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              maxWidth: 760,
            }}
          >
            Desenvolvedor Backend na Mottu, estudante da Unicamp e criador de
            soluções com foco em .NET 8, cloud, mensageria e observabilidade. A
            ideia aqui é apresentar minha trajetória com clareza, impacto e uma
            identidade visual mais premium.
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
