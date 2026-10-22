/** Read-only schema readiness check; does not read application rows. */
import { loadEnvConfig } from "@next/env";
import { initDb } from "../lib/db";
loadEnvConfig(process.cwd());
initDb().then(
  () => console.log("Posts schema readiness passed (read-only)."),
  () => {
    console.error("Posts schema readiness failed; review the explicit schema migration before serving.");
    process.exitCode = 1;
  },
);
