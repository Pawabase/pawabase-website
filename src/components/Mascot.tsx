type Pose = "laptop" | "server" | "signal";

const source: Record<Pose, string> = {
  laptop: "/images/mascot/little-automaton-laptop.png",
  server: "/images/mascot/little-automaton-server.png",
  signal: "/images/mascot/little-automaton-signal.png",
};

export function Mascot({ pose, className = "", decorative = false }: { pose: Pose; className?: string; decorative?: boolean }) {
  return <img className={`mascot mascot-${pose} ${className}`} src={source[pose]} alt={decorative ? "" : "The Little Automaton"} aria-hidden={decorative || undefined} />;
}
