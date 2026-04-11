import { Box, Container, Stack, Typography } from "@mui/material";
import SocialIcon from "@/components/SocialIcon";

export default function Contact() {
  return (
    <Box id="contato" sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: "92px" }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2.1rem", md: "3.4rem" } }}
          >
            Contato
          </Typography>
          <SocialIcon />
          <Typography color="text.secondary">
            Feito por João Calsavara
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
