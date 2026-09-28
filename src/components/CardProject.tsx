import Image from "next/image";
import Link from "next/link";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SkillsTags from "@/components/SkillsTags";
import type { TechnologyTagMap } from "@/lib/portfolio";
import styles from "./CardProject.module.scss";

type CardProjectProps = {
  slug: string;
  title: string;
  summaryLine?: string | null;
  period?: string | null;
  tecnosUsed?: string[];
  description: string;
  imageUrl?: string | null;
  produtionLink?: string | null;
  repositoryLink?: string | null;
  tagsMap?: TechnologyTagMap;
};

function ActionButton({ label, url }: { label: string; url?: string | null }) {
  const isAvailable = Boolean(url && url.trim().length > 0);
  const isExternal = Boolean(url && /^(https?:\/\/|mailto:|tel:)/i.test(url));
  const isInternal = Boolean(url && !isExternal && url.startsWith("/"));

  if (!isAvailable) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={`${label} não disponível`}
        className={`${styles.btnAction} ${styles.btnDisabled}`}
      >
        <span>{label}</span>
      </button>
    );
  }

  if (isInternal) {
    return (
      <Link
        href={url!}
        className={`${styles.btnAction} ${styles.btnActive}`}
      >
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <a
      href={url!}
      target="_blank"
      rel="noreferrer"
      className={`${styles.btnAction} ${styles.btnActive}`}
    >
      <span>{label}</span>
      <OpenInNewRoundedIcon className={styles.actionIcon} fontSize="small" />
    </a>
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
    <article className={styles.projectCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={imagePath}
          alt={`Imagem do projeto ${title}`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          quality={72}
          className={styles.projectImage}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.infoStack}>
          <h3 className={styles.cardTitle}>{title}</h3>

          <div className={styles.metaRow}>
            <span className={styles.summaryLine}>
              {summaryLine || "Projeto de software"}
            </span>
            {period ? <span className={styles.period}>{period}</span> : null}
          </div>

          <SkillsTags tecnosUsed={tecnosUsed || []} tagsMap={tagsMap} />
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actionsRow}>
          <ActionButton label="Detalhes" url={`/projetos/${slug}`} />
          <ActionButton label="Produção" url={produtionLink} />
          <ActionButton label="Repositório" url={repositoryLink} />
        </div>
      </div>
    </article>
  );
}
