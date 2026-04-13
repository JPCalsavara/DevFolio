import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SocialIcon from "@/components/SocialIcon";

export default function Hero() {
  return (
    <Box sx={{ pt: { xs: 12, md: 14 }, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={4}
          sx={{ alignItems: "center" }}
        >
          <Stack spacing={2} sx={{ flex: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: { xs: 220, md: 360 },
                height: { xs: 220, md: 360 },
                borderRadius: "50%",
                border: "2px solid rgba(92,156,255,0.65)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/images/hero-img.jpg"
                alt="Hero"
                fill
                priority
                sizes="(max-width: 900px) 220px, 360px"
                quality={80}
                style={{ objectFit: "cover" }}
              />
            </Box>
            <SocialIcon />
          </Stack>

          <Box sx={{ flex: 1.4 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "2rem", md: "3.5rem" }, mb: 2 }}
            >
              Quem eu sou?
            </Typography>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
              Meu nome e{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                João Pedro Calsavara
              </Box>
              , sou Desenvolvedor Backend e estudante de{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Análise e Desenvolvimento de Sistemas na Unicamp
              </Box>
              .
              <br />
              <br />
              Atualmente atuo na{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Mottu
              </Box>{" "}
              com foco em .NET 8, microsserviços e dados estratégicos para
              operações de alta escala.
              <br />
              <br />
              Minhas principais experiências incluem arquiteturas orientadas a
              eventos, automações com IA, observabilidade em Datadog e
              infraestrutura cloud com Docker/Kubernetes.
              <br />
              <br />
              Entre os projetos de destaque estão o{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                InterceptorSystem
              </Box>
              , plataforma full stack estruturada com Clean Architecture e DDD,
              e a plataforma da{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                Ju Decoração de Natal
              </Box>
              , com foco em SEO e performance de negócio.
              <br />
              <br />
              Minha stack principal inclui{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                C#, .NET 8, PostgreSQL, SQL Server, RabbitMQ/PubSub e Kubernetes
              </Box>
              .
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ display: "grid", placeItems: "center", mt: 3 }}>
          <Box
            component="a"
            href="#projetos"
            sx={{
              p: 1.1,
              borderRadius: 999,
              "&:hover": { backgroundColor: "rgba(92,156,255,0.16)" },
            }}
          >
            <Box sx={{ width: 38, height: 38, position: "relative" }}>
              <Image
                src="/images/icons/arrow-down-svgrepo-com.svg"
                alt="Ir para projetos"
                fill
                sizes="38px"
                style={{ animation: "bounce 1.6s infinite" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
