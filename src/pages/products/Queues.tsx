import { Icon } from "@/components/Icon";
import { Sky } from "@/components/home/Home";
import { SiteNav } from "@/components/site/SiteNav";
import { Band, HeroActions, ProductFrame, useTicker } from "@/components/product/ProductFrame";
import "./queues.css";

/* Work moving: jobs cross a four-column board in the hero, a retry waits a little longer each time, a split-flap board shows what runs next, and a failed job comes back. */

const STAGES = ["Waiting", "Active", "Completed", "Failed"];
const JOBS: { name: string; fails?: boolean }[] = [
  { name: "Send receipt" }, { name: "Resize image" }, { name: "Sync customer", fails: true }, { name: "Build report" },
  { name: "Send welcome email" }, { name: "Clean up files" }, { name: "Call the shipping API" },
];
const BOARD: [string, string, string][] = [
  ["09:00", "WEEKLY DIGEST", "MONDAYS"],
  ["12:00", "SYNC CUSTOMERS", "EVERY HOUR"],
  ["00:00", "NIGHTLY REPORT", "EVERY NIGHT"],
];
const COLS = 15;
const WAITS = [1, 2, 4, 8];

/** Where a job is at this moment: it waits its turn, runs, then finishes or fails, and rests there for a while. */
function stageOf(tick: number, i: number, fails?: boolean) {
  const at = (tick + i * 3) % 12;
  if (at < 3) return 0;
  if (at < 5) return 1;
  return fails ? 3 : 2;
}

function Jobs() {
  const tick = useTicker(1200);
  return (
    <div className="qu-board" aria-hidden="true">
      {STAGES.map((stage, s) => {
        const here = JOBS.map((job, i) => ({ job, i })).filter(({ job, i }) => stageOf(tick, i, job.fails) === s);
        return (
          <div key={stage} className={`qu-col s${s}`}>
            <header><b>{stage}</b><small>{here.length}</small></header>
            {here.map(({ job }) => <div key={job.name} className="qu-job">{s === 1 && <i className="qu-spin" />}{job.name}</div>)}
          </div>
        );
      })}
    </div>
  );
}

function Flap({ text, width }: { text: string; width: number }) {
  return (
    <span className="qu-flaps">
      {text.padEnd(width).slice(0, width).split("").map((char, i) => <i key={i} style={{ animationDelay: `${i * 40}ms` }}>{char === " " ? " " : char}</i>)}
    </span>
  );
}

export default function QueuesPage() {
  const again = useTicker(1800) % 4;
  return (
    <ProductFrame name="Queues" description="Background jobs with durable retries, schedules, and failed jobs you can see and run again.">
      <section className="ix-hero qu-hero" aria-labelledby="product-title" data-plain="">
        <Sky seed={57} />
        <SiteNav />
        <div className="qu-intro">
          <h1 id="product-title" data-reveal="up">Work that doesn't make people wait.</h1>
          <div data-reveal="up">
            <p>Move slow work into the background, retry what fails, and run jobs on a schedule.</p>
            <HeroActions />
          </div>
        </div>
        <Jobs />
      </section>

      <Band label="Retries built in" className="qu-retry">
        <div className="qu-retry-copy">
          <h2>Tried again, waiting a little longer each time.</h2>
          <p>Retries survive restarts, so no work is lost.</p>
        </div>
        <div className="qu-track" aria-hidden="true">
          <span className="qu-try first"><i /><b>Try 1</b></span>
          {WAITS.map((wait, i) => (
            <span key={wait} className="qu-stretch" style={{ flexGrow: wait }}>
              <span className={`qu-try ${i === WAITS.length - 1 ? "last" : ""}`}><i /><b>{i === WAITS.length - 1 ? "Done" : `Try ${i + 2}`}</b></span>
            </span>
          ))}
        </div>
      </Band>

      <Band label="Schedules" className="qu-depart">
        <div className="qu-depart-head">
          <h2>Next up.</h2>
          <p>Run work every hour, every night or on any timetable.</p>
        </div>
        <div className="qu-rows" aria-hidden="true">
          {BOARD.map(([time, job, repeat]) => (
            <div key={job} className="qu-row">
              <Flap text={time} width={5} />
              <Flap text={job} width={COLS} />
              <em>{repeat}</em>
            </div>
          ))}
        </div>
      </Band>

      <Band label="Failed jobs" className="qu-failed">
        <div className={`qu-card ${again >= 2 ? "mended" : ""}`} aria-hidden="true">
          <header>
            <b>Sync customer</b>
            <em>{again >= 2 ? "Completed" : "Failed"}</em>
          </header>
          <p>{again >= 2 ? "Ran again and finished." : "The service didn't answer in time."}</p>
          <span className={`qu-again ${again === 1 ? "press" : ""}`}><Icon name="refresh" size={15} variant="Linear" />Run again</span>
        </div>
        <div>
          <h2>Nothing fails quietly.</h2>
          <p>Failed jobs are kept with their reason, ready to run again. Start jobs from any flow, or react to what happens in your system.</p>
        </div>
      </Band>
    </ProductFrame>
  );
}
