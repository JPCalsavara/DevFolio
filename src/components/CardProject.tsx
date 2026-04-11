import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SkillsTags from "@/components/SkillsTags";

type CardProjectProps = {
  slug: string;
  title: string;
  summaryLine?: string;
  period?: string;
  tecnosUsed?: string[];
  description: string;
  urlName: string;
  produtionLink?: string;
  repositoryLink?: string;
};

function ActionButton({ label, url }: { label: string; url?: string }) {
  const isAvailable = Boolean(url);
  const isExternal = Boolean(url && /^(https?:\/\/|mailto:|tel:)/i.test(url));

  return (
    <Button
      component="a"
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
  urlName,
  produtionLink,
  repositoryLink,
}: CardProjectProps) {
  const imagePath =
    urlName !== ""
      ? `/images/projects/${urlName}.jpeg`
      : "/images/projects/default.jpg";

  return (
    <Card
      sx={{
        p: 1,
        borderRadius: 3,
        backgroundColor: "rgba(18,23,34,0.85)",
        transition: "transform .2s ease",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <Box
        component="img"
        src={imagePath}
        alt={`Imagem do projeto ${title}`}
        sx={{
          width: "100%",
          maxHeight: 350,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />
      <CardContent>
        <Stack spacing={2}>
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
              alignItems: { sm: "center" },
            }}
          >
            <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
              {summaryLine || "Projeto de software"}
            </Typography>
            {period ? (
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                }}
              >
                {period}
              </Typography>
            ) : null}
          </Stack>

          <SkillsTags tecnosUsed={tecnosUsed || []} />
          <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
            {description}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.2}
            sx={{ justifyContent: "center" }}
          >
            <ActionButton label="Detalhes" url={`/projetos/${slug}`} />
            <ActionButton label="Produção" url={produtionLink} />
            <ActionButton label="Repositório" url={repositoryLink} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
