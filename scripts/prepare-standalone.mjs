import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");
const publicSource = path.join(root, "public");
const publicTarget = path.join(standaloneDir, "public");
const staticSource = path.join(root, ".next", "static");
const staticTarget = path.join(standaloneNextDir, "static");

await mkdir(standaloneNextDir, { recursive: true });
await cp(publicSource, publicTarget, { recursive: true, force: true });
await cp(staticSource, staticTarget, { recursive: true, force: true });
