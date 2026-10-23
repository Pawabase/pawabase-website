import type { ComponentProps } from "react";
import {
  Activity,
  Add,
  ArrowRight2,
  Calendar,
  CloseCircle,
  Code1,
  Copy,
  Data,
  DocumentText,
  Flash,
  Folder2,
  HambergerMenu,
  Hierarchy3,
  Image as ImageIcon,
  Layer,
  Link21,
  MagicStar,
  Message,
  Play,
  Profile2User,
  Refresh,
  SearchNormal1,
  SecurityUser,
  ShieldSecurity,
  Video,
} from "iconsax-react";

type IconsaxIcon = typeof Data;
type IconsaxVariant = NonNullable<ComponentProps<typeof Data>["variant"]>;

const MAP: Record<string, IconsaxIcon> = {
  activity: Activity,
  add: Add,
  apiSecurity: ShieldSecurity,
  arrowRight: ArrowRight2,
  automation: Hierarchy3,
  close: CloseCircle,
  copy: Copy,
  database: Data,
  document: DocumentText,
  events: Flash,
  firewall: ShieldSecurity,
  code: Code1,
  image: ImageIcon,
  mail: Message,
  menu: HambergerMenu,
  play: Play,
  policies: SecurityUser,
  queues: Layer,
  realtime: Activity,
  refresh: Refresh,
  scheduling: Calendar,
  search: SearchNormal1,
  sparkle: MagicStar,
  storage: Folder2,
  users: Profile2User,
  video: Video,
  webhooks: Link21,
};

export type IconName = keyof typeof MAP;

export function Icon({
  name,
  size = 18,
  className = "",
  variant = "Linear",
  color = "currentColor",
}: {
  name: IconName | (string & {});
  size?: number;
  className?: string;
  variant?: IconsaxVariant;
  color?: string;
}) {
  const Mark = MAP[name] ?? MAP.database;
  return <Mark size={size} color={color} variant={variant} className={className} aria-hidden />;
}
