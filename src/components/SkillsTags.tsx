import Link from "next/link";
import { Chip, Stack } from "@mui/material";
import type { TechnologyTagMap } from "@/lib/portfolio";

type SkillsTagsProps = {
  tecnosUsed: string[];
  tagsMap?: TechnologyTagMap;
};

const colorByCategory: Record<string, string> = {
  frontend: "#FB7185",
  backend: "#A3E635",
  database: "#F59E0B",
  all: "#A78BFA",
  devops: "#22D3EE",
  softskill: "#22D3EE",
  default: "#64748B",
};

export default function SkillsTags({ tecnosUsed, tagsMap }: SkillsTagsProps) {
  return (
    <Stack
      direction="row"
      sx={{
        flexWrap: "wrap",
        columnGap: 1,
        rowGap: 1,
      }}
    >
      {tecnosUsed.map((tecno) => {
        const info = tagsMap?.[tecno] || {
          category: "default",
          realName: tecno,
          link: "#",
        };
        const bg = colorByCategory[info.category] || colorByCategory.default;

        return (
          <Chip
            key={`${tecno}-${info.realName}`}
            label={
              info.link ? (
                <Link href={info.link} target="_blank" rel="noreferrer">
                  {info.realName}
                </Link>
              ) : (
                info.realName
              )
            }
            size="small"
            sx={{
              backgroundColor: bg,
              color: "#0B1020",
              fontWeight: 700,
              borderRadius: 2,
            }}
          />
        );
      })}
    </Stack>
  );
}
