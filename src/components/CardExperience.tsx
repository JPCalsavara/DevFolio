import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import ExperienceImageCarousel from "@/components/ExperienceImageCarousel";
import SkillsTags from "@/components/SkillsTags";
import type { TechnologyTagMap } from "@/lib/portfolio";

type CardExperienceProps = {
  slug?: string;
  title: string;
  imageUrl?: string;
  imageUrls?: string[];
  location?: string;
  period?: string;
  role?: string;
  summary: string;
  achievements?: string[];
  skillsLearned: string[];
  exploreHref?: string;
  exploreLabel?: string;
  showExploreButton?: boolean;
  tagsMap?: TechnologyTagMap;
};

export default function CardExperience({
  slug,
  title,
  imageUrl,
  imageUrls,
  location,
  period,
  role,
  summary,
  achievements,
  skillsLearned,
  exploreHref,
  exploreLabel = "Detalhar",
  showExploreButton = true,
  tagsMap,
}: CardExperienceProps) {
  const detailHref = exploreHref || (slug ? `/experiencia/${slug}` : undefined);

  return (
    <Card
      sx={{
        borderRadius: 3,
        backgroundColor: "rgba(13, 27, 45, 0.95)",
        border: "1px solid rgba(125, 211, 252, 0.14)",
      }}
    >
      <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
        <Stack spacing={2.2}>
          {imageUrls?.length ? (
            <ExperienceImageCarousel imageUrls={imageUrls} title={title} />
          ) : imageUrl ? (
            <Stack
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={imageUrl}
                alt={`Foto da experiência ${title}`}
                fill
                sizes="(max-width: 900px) 100vw, 70vw"
                quality={72}
                style={{ objectFit: "cover" }}
              />
            </Stack>
          ) : null}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{
              justifyContent: "space-between",
              alignItems: { sm: "flex-start" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.85rem", md: "2.4rem" },
                fontWeight: 800,
              }}
            >
              {title}
            </Typography>
            {location ? (
              <Typography
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  textAlign: { xs: "left", sm: "right" },
                }}
              >
                {location}
              </Typography>
            ) : null}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{
              justifyContent: "space-between",
              alignItems: { sm: "center" },
            }}
          >
            {role ? (
              <Typography sx={{ fontStyle: "italic", color: "text.primary" }}>
                {role}
              </Typography>
            ) : (
              <span />
            )}
            {period ? (
              <Typography sx={{ fontStyle: "italic", color: "text.secondary" }}>
                {period}
              </Typography>
            ) : null}
          </Stack>

          <Typography sx={{ fontStyle: "italic", color: "text.secondary" }}>
            {summary}
          </Typography>

          {achievements?.length ? (
            <Stack component="ul" spacing={1.2} sx={{ pl: 2.5, m: 0 }}>
              {achievements.map((item) => (
                <Typography
                  component="li"
                  key={item}
                  sx={{ color: "text.primary", lineHeight: 1.7 }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          ) : null}

          <SkillsTags tecnosUsed={skillsLearned} tagsMap={tagsMap} />

          {showExploreButton && detailHref ? (
            <Link href={detailHref} style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="contained"
                color="secondary"
                sx={{ alignSelf: "flex-start" }}
              >
                {exploreLabel}
              </Button>
            </Link>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
