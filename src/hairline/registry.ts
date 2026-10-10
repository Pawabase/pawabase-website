import type { FigureMount, Tour } from "./core/stage";
import { defineRange } from "./intensity";

/**
 * The figures the site uses, each loaded on demand so a page only carries the engines it shows.
 * A figure here is the package's own (loaded from ./figures) or one Pawabase drew (./pawabase).
 */
export type FigureSpec = {
  label: string;
  rest: string;
  tour?: Tour;
  focusable?: boolean;
  load: () => Promise<{ mount: FigureMount }>;
};

const builtin = (label: string, load: FigureSpec["load"], more: Partial<FigureSpec> = {}): FigureSpec => ({ label, rest: "rest", load, ...more });

export const figures: Record<string, FigureSpec> = {};

/* The figures Pawabase drew, in the package's own style (see ./pawabase). Each declares the range its slider drives, at intensity 0, 0.5 and 1. */
defineRange("foundation", [20, 32, 44]); // lift, viewBox units
figures.foundation = builtin(
  "Four layers a request meets, one over another: identity, policy, records and files. The pointer's height picks a layer, and the layers above it lift away to open it.",
  () => import("./pawabase/foundation"),
  { tour: [[200, 232], [200, 205], [200, 178], null] },
);

defineRange("schema", [8, 14, 20]); // rise, viewBox units
figures.schema = builtin(
  "The tables of an application as tiles joined by the references between them: the table under the pointer rises, and every table that refers to it rises after it along the links.",
  () => import("./pawabase/schema"),
  { tour: [[47, 236], [276, 172], [181, 106], null] },
);
defineRange("workers", [10, 16, 24]); // rise, viewBox units
figures.workers = builtin(
  "A plate with four worker tiles around it on dashed links: the tile under the pointer rises alone and its link turns solid; the others and the plate do not move.",
  () => import("./pawabase/workers"),
  { tour: [[205, 112], [328, 179], [201, 243], [76, 177], null] },
);
defineRange("regions", [10, 16, 24]); // rise, viewBox units
figures.regions = builtin(
  "A control plate with six sites around it: the one that is open is a tile and rises under the pointer; the others are dashed footprints that are not published yet.",
  () => import("./pawabase/regions"),
  { tour: [[76, 177], [205, 112], [263, 207], null] },
);

defineRange("session", [10, 16, 22]);
figures.session = builtin(
  "A card file of four cards of different heights: the person, the session, the organization and the second factor. The card under the pointer slides up out of the file.",
  () => import("./pawabase/session"),
  { tour: [[110, 214], [150, 190], [190, 170], null] },
);
defineRange("records", [10, 16, 24]);
figures.records = builtin(
  "The rows of a table as long strips on a plate: the row under the pointer slides out of the table, and its neighbours follow a little.",
  () => import("./pawabase/records"),
  { tour: [[150, 120], [190, 160], [230, 210], null] },
);
defineRange("bucket", [10, 16, 24]);
figures.bucket = builtin(
  "Three crates of different sizes on a plate, and a dashed footprint for one that does not exist yet. The crate under the pointer lifts clear.",
  () => import("./pawabase/bucket"),
  { tour: [[120, 150], [230, 180], [140, 215], null] },
);
defineRange("rack", [10, 16, 24]);
figures.rack = builtin(
  "Four blades in a frame, one over another: the blade under the pointer slides out along its rails, and its neighbours follow a little.",
  () => import("./pawabase/rack"),
  { tour: [[200, 130], [200, 170], [200, 215], null] },
);
defineRange("steps", [8, 14, 20]);
figures.steps = builtin(
  "A stair of five treads climbing to the back: the tread under the pointer lifts, and its neighbours follow.",
  () => import("./pawabase/steps"),
  { tour: [[110, 215], [190, 180], [270, 130], null] },
);
