"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

type ExperienceImageCarouselProps = {
  imageUrls: string[];
  title: string;
};

export default function ExperienceImageCarousel({
  imageUrls,
  title,
}: ExperienceImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const canSlide = imageUrls.length > 1;
  const activeImage = imageUrls[activeIndex] || imageUrls[0];

  const goNext = () => {
    if (!canSlide) return;
    setActiveIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const goPrevious = () => {
    if (!canSlide) return;
    setActiveIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  return (
    <Stack spacing={1.2}>
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
          src={activeImage}
          alt={`Foto da experiência ${title}`}
          fill
          sizes="(max-width: 900px) 100vw, 70vw"
          quality={72}
          style={{ objectFit: "cover" }}
        />
      </Box>

      {canSlide ? (
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <IconButton onClick={goPrevious} size="small" color="secondary">
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>

          <Stack direction="row" spacing={0.8}>
            {imageUrls.map((imageUrl, index) => (
              <Box
                key={imageUrl}
                onClick={() => setActiveIndex(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 99,
                  cursor: "pointer",
                  backgroundColor:
                    index === activeIndex
                      ? "secondary.main"
                      : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </Stack>

          <IconButton onClick={goNext} size="small" color="secondary">
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ) : null}
    </Stack>
  );
}
