import { existsSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

const nextCacheDir = ".next";
const nextBin = join("node_modules", ".bin", process.platform === "win32" ? "next.cmd" : "next");
const majorNodeVersion = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);

if (majorNodeVersion < 20 || majorNodeVersion >= 25) {
  console.error(
    `Unsupported Node.js version ${process.versions.node}. Use Node 22 for stable local development: \`nvm use\`.`,
  );
  process.exit(1);
}

// Clear generated runtime artifacts before each dev session to avoid stale chunk
// references when switching branches or recovering from interrupted HMR runs.
if (existsSync(nextCacheDir)) {
  rmSync(nextCacheDir, { recursive: true, force: true });
}

const child = spawn(nextBin, ["dev"], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
