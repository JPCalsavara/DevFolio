"use client";

import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { resolveTechIcon } from "@/lib/techIcons";

type CardSkillProps = {
  name: string;
  link?: string | null;
  type: string;
  isHovered: boolean;
  label: string;
  iconUrl?: string | null;
};

const colorByCategory: Record<string, string> = {
  frontend: "rgba(251, 113, 133, 0.2)",
  backend: "rgba(163, 230, 53, 0.2)",
  database: "rgba(245, 158, 11, 0.2)",
  all: "rgba(167, 139, 250, 0.2)",
  devops: "rgba(34, 211, 238, 0.2)",
  default: "rgba(100, 116, 139, 0.2)",
};

export default function CardSkills({
  name,
  link,
  type,
  label,
  isHovered,
  iconUrl,
}: CardSkillProps) {
  const initialIcon = resolveTechIcon(name, iconUrl);
  const [imgSrc, setImgSrc] = useState(initialIcon);

  const bgColor = isHovered
    ? colorByCategory[type] || colorByCategory.default
    : "rgba(255,255,255,0.02)";

  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        border: "1px solid rgba(255,255,255,0.12)",
        transition: "all .2s ease",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
      }}
    >
      <CardActionArea
        component={link ? "a" : "div"}
        href={link || undefined}
        target={link ? "_blank" : undefined}
      >
        <CardContent sx={{ display: "grid", placeItems: "center", gap: 1 }}>
          <Box
            component="img"
            src={imgSrc}
            alt={`${name} logo`}
            onError={() => setImgSrc("/images/icons/screen-svgrepo-com.svg")}
            loading="lazy"
            decoding="async"
            sx={{ width: 64, height: 64, objectFit: "contain" }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              lineHeight: 1.3,
              maxWidth: "100%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
            }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
