const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const nodeDir = path.join(__dirname, "node-v24.17.0-win-x64");
const log = fs.createWriteStream(path.join(__dirname, "dev-server.log"), { flags: "a" });
const err = fs.createWriteStream(path.join(__dirname, "dev-server.err.log"), { flags: "a" });

const child = spawn(
  path.join(nodeDir, "node.exe"),
  [path.join(root, "node_modules", "vite", "bin", "vite.js"), "dev", "--host", "127.0.0.1", "--port", "5173", "--strictPort"],
  {
    cwd: root,
    env: {
      ...process.env,
      PATH: `${nodeDir};${process.env.PATH || ""}`,
    },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

log.write(`\n[supervisor] started vite pid=${child.pid}\n`);
child.stdout.pipe(log);
child.stderr.pipe(err);

child.on("exit", (code, signal) => {
  log.write(`[supervisor] vite exited code=${code} signal=${signal}\n`);
  process.exitCode = code ?? 1;
});

setInterval(() => {}, 60_000);
