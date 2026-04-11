import Link from "next/link";
import { Box, Button, Stack } from "@mui/material";
import { socialLinks } from "@/data/portfolioData";

export default function SocialIcon() {
  const visibleSocialLinks = Object.entries(socialLinks).filter(
    ([key]) => key !== "instagram",
  );

  return (
    <Stack
      direction="row"
      spacing={1.2}
      sx={{ flexWrap: "wrap", justifyContent: "center" }}
    >
      {visibleSocialLinks.map(([key, url]) => (
        <Link key={key} href={url} target="_blank" rel="noreferrer">
          <Box
            component="img"
            src={`/images/social/${key}-icon.svg`}
            alt={`${key} icon`}
            sx={{
              width: { xs: 32, md: 44 },
              height: { xs: 32, md: 44 },
              p: 0.7,
              borderRadius: 2,
              transition: "transform .2s ease",
              "&:hover": { transform: "translateY(-2px) scale(1.06)" },
            }}
          />
        </Link>
      ))}

      <Button
        href="/files/curriculo.pdf"
        component="a"
        download
        variant="contained"
        color="primary"
        sx={{ mt: 1, minWidth: 180 }}
      >
        Clique para CV
      </Button>
    </Stack>
  );
}
