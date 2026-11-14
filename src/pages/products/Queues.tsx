import { useState } from "react";

import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/home/Home";
import { ProductFrame, useTicker } from "@/components/product/ProductFrame";
import { StackArt } from "@/components/product/objects";
import { ProductHero } from "@/components/product/sections";

import "./queues.css";

/*
 * Queues, told through one job that will not give up. The hero is a stack of jobs. Then: retries as a track whose gaps grow, a job
 * hopping along it; a departures board of what runs next; and a failed job you can run again. Nothing here appears on another
 * product page.
 */

const WAITS = [1, 2, 4, 8];

function Backoff() {
  const at = useTicker(1200, WAITS.length + 1) % (WAITS.length + 2);
  return (
    <section className="ix-section" aria-labelledby="qu-backoff-title" data-plain="">
      <SectionHead id="qu-backoff-title" title="It tries again, and waits a little longer each time" lead="When a job fails, it waits before trying again, longer after each failure, so a struggling service gets room to recover. Retries survive restarts." />
      <div className="qu-track" data-reveal="up" aria-hidden="true">
        <span className={`qu-stop ${at >= 0 ? "past" : ""}`}><i />Try 1</span>
        {WAITS.map((wait, i) => (
          <span key={wait} className="qu-leg" style={{ flexGrow: wait }}>
            <span className="qu-gap"><em>waits {wait}×</em></span>
            <span className={`qu-stop ${at > i ? "past" : ""} ${i === WAITS.length - 1 ? "end" : ""}`}><i />{i === WAITS.length - 1 ? "Done" : `Try ${i + 2}`}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const BOARD: [string, string, string][] = [
  ["09:00", "WEEKLY DIGEST", "MONDAYS"],
  ["12:00", "SYNC CUSTOMERS", "HOURLY"],
  ["00:00", "NIGHTLY REPORT", "NIGHTLY"],
  ["03:30", "CLEAN UP FILES", "DAILY"],
];

function Flap({ text, width }: { text: string; width: number }) {
  return <span className="qu-flaps">{text.padEnd(width).split("").map((ch, i) => <i key={i}>{ch}</i>)}</span>;
}

function Board() {
  return (
    <section className="ix-section ix-band" aria-labelledby="qu-board-title" data-plain="">
      <SectionHead id="qu-board-title" title="Next departures" lead="Run work every hour, every night, or on any timetable you write. Schedules live with your project, not in a crontab on some server." />
      <div className="qu-board" data-reveal="up" aria-hidden="true">
        <div className="qu-board-head"><span>Time</span><span>Job</span><span>Repeats</span></div>
        {BOARD.map(([time, job, repeat]) => (
          <div key={job} className="qu-board-row"><Flap text={time} width={5} /><Flap text={job} width={14} /><em>{repeat}</em></div>
        ))}
      </div>
    </section>
  );
}

function Again() {
  const [fixed, setFixed] = useState(false);
  return (
    <section className="ix-section" aria-labelledby="qu-again-title" data-plain="">
      <SectionHead id="qu-again-title" title="Nothing fails quietly" lead="A job that runs out of tries is kept with the reason it failed. Fix the cause, then run it again, one job or all of them." />
      <div className="qu-again" data-reveal="up">
        <div className={`qu-job ${fixed ? "fixed" : ""}`}>
          <header><span className="qu-icon"><Icon name="queues" size={18} variant="Linear" /></span><b>Sync customer</b><em>{fixed ? "Completed" : "Failed after 4 tries"}</em></header>
          <p>{fixed ? "Ran again and finished in 1.2 s." : "The CRM didn't answer in time."}</p>
          <button type="button" className="btn btn-light btn-sm" onClick={() => setFixed(!fixed)}>{fixed ? "Show the failure again" : "Run again"}</button>
        </div>
        <ul className="qu-why">
          <li><b>The reason, in words</b><span>What went wrong on the last try.</span></li>
          <li><b>Every try</b><span>When each one ran and how it ended.</span></li>
          <li><b>Run all failed</b><span>Once a service is back, send every failed job again.</span></li>
        </ul>
      </div>
    </section>
  );
}

export default function QueuesPage() {
  return (
    <ProductFrame
      name="Queues"
      description="Background jobs with durable retries, schedules, and failed jobs you can see and run again."
      hero={
        <ProductHero
          title="Work that doesn't"
          quiet="make people wait."
          lead="Move slow work into the background, retry what fails, and run jobs on a schedule."
          art={<StackArt />}
          notes={["Retries that survive restarts", "Schedules", "Run again in one click"]}
        />
      }
    >
      <Backoff />
      <Board />
      <Again />
    </ProductFrame>
  );
}
