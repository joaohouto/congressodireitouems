import { ArrowUpRightIcon, FileTextIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DOWNLOADABLE_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];

function isDownloadable(url: string) {
  const path = url.toLowerCase().split(/[?#]/)[0];
  return DOWNLOADABLE_EXTENSIONS.some((ext) => path.endsWith(ext));
}

// Rounding for a row inside a divide-y list: when ResourceLink is a direct
// child of the list, `first`/`last` below rely on real DOM position via
// CSS. When it's wrapped by something else (e.g. editais' nested <li>),
// that wrapper doesn't reflect true position anymore, so the caller must
// compute and pass `roundedEdge` explicitly instead.
const AUTO_ROUNDED = "rounded-none first:rounded-t-lg last:rounded-b-lg";

const ROUNDED_EDGE_CLASS = {
  top: "rounded-t-lg rounded-b-none",
  bottom: "rounded-b-lg rounded-t-none",
  both: "rounded-lg",
  none: "rounded-none",
};

export function ResourceLink({
  title,
  url,
  badge,
  compact = false,
  roundedEdge,
}: {
  title: string;
  url?: string;
  badge?: string;
  compact?: boolean;
  roundedEdge?: "top" | "bottom" | "both" | "none";
}) {
  const Icon = url && isDownloadable(url) ? FileTextIcon : ArrowUpRightIcon;

  const className = cn(
    "flex items-center gap-3 px-3 transition-colors",
    roundedEdge ? ROUNDED_EDGE_CLASS[roundedEdge] : AUTO_ROUNDED,
    compact ? "py-2" : "py-2.5",
    url && "hover:bg-muted",
  );

  const content = (
    <>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-md bg-primary/10 text-primary",
          compact ? "size-7" : "size-8",
        )}
      >
        <Icon className={compact ? "size-3.5" : "size-4"} />
      </span>

      <span
        className={cn(
          "flex-1 text-foreground",
          compact ? "text-sm" : "text-sm font-medium",
        )}
      >
        {title}
      </span>

      {badge && <Badge variant="secondary">{badge}</Badge>}
    </>
  );

  if (!url) return <div className={className}>{content}</div>;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
}
