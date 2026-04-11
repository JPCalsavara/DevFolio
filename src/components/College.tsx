import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { collegeData } from "@/data/portfolioData";

export default function College() {
  return (
    <Box
      id="faculdade"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: "rgba(10,20,36,0.72)",
        scrollMarginTop: "92px",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2.4}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2.1rem", md: "3.4rem" } }}
          >
            Faculdade
          </Typography>

          <Box
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              backgroundColor: "rgba(13, 27, 45, 0.92)",
              border: "1px solid rgba(125,211,252,0.16)",
            }}
          >
            <Stack spacing={1.2}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {collegeData.institution} - {collegeData.course}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {collegeData.period} | {collegeData.status} |{" "}
                {collegeData.location}
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                {collegeData.summary}
              </Typography>

              <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                {collegeData.subjects.slice(0, 4).map((subject) => (
                  <Chip
                    key={subject}
                    label={subject}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(125,211,252,0.18)",
                      color: "text.primary",
                      fontWeight: 700,
                    }}
                  />
                ))}
              </Stack>

              <Button
                href="/faculdade"
                component="a"
                variant="outlined"
                color="secondary"
                sx={{ alignSelf: "flex-start", mt: 0.8 }}
              >
                Ver detalhes da formação
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
