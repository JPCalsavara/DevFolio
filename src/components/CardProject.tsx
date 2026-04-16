import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SkillsTags from "@/components/SkillsTags";
import type { TechnologyTagMap } from "@/lib/portfolio";

type CardProjectProps = {
  slug: string;
  title: string;
  summaryLine?: string;
  period?: string;
  tecnosUsed?: string[];
  description: string;
  imageUrl?: string | null;
  produtionLink?: string;
  repositoryLink?: string;
  tagsMap?: TechnologyTagMap;
};

function ActionButton({ label, url }: { label: string; url?: string }) {
  const isAvailable = Boolean(url);
  const isExternal = Boolean(url && /^(https?:\/\/|mailto:|tel:)/i.test(url));
  const isInternal = Boolean(url && !isExternal && url.startsWith("/"));

  return (
    <Button
      component={isInternal ? Link : "a"}
      href={url || undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      disabled={!isAvailable}
      variant="contained"
      color={isAvailable ? "primary" : "error"}
      endIcon={<OpenInNewRoundedIcon fontSize="small" />}
      sx={{ width: { xs: "100%", sm: "auto" } }}
    >
      {label}
    </Button>
  );
}

export default function CardProject({
  slug,
  title,
  summaryLine,
  period,
  description,
  tecnosUsed,
  imageUrl,
  produtionLink,
  repositoryLink,
  tagsMap,
}: CardProjectProps) {
  const imagePath =
    imageUrl && imageUrl.trim().length > 0
      ? imageUrl
      : "/images/projects/default.jpg";

  return (
    <Card
      sx={{
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        backgroundColor: "rgba(18,23,34,0.85)",
        transition: "transform .2s ease",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={imagePath}
          alt={`Imagem do projeto ${title}`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          quality={72}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 800 }}
          >
            {title}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0.4}
            sx={{
              justifyContent: "space-between",
              alignItems: { sm: "flex-start" },
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontStyle: "italic",
                lineHeight: 1.35,
                alignSelf: { sm: "flex-start" },
              }}
            >
              {summaryLine || "Projeto de software"}
            </Typography>
            {period ? (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  minWidth: "8rem",
                  lineHeight: 1.35,
                  alignSelf: { sm: "flex-start" },
                  textAlign: { xs: "left", sm: "right" },
                }}
              >
                {period}
              </Typography>
            ) : null}
          </Stack>

          <SkillsTags tecnosUsed={tecnosUsed || []} tagsMap={tagsMap} />
          <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
            {description}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.2}
          sx={{ justifyContent: "center", mt: 2 }}
        >
          <ActionButton label="Detalhes" url={`/projetos/${slug}`} />
          <ActionButton label="Produção" url={produtionLink} />
          <ActionButton label="Repositório" url={repositoryLink} />
        </Stack>
      </CardContent>
    </Card>
  );
}
