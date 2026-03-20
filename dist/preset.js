// src/preset.js
import { fileURLToPath } from "url";
import path from "path";
var __dirname = fileURLToPath(new URL(".", import.meta.url));
function managerEntries(entry = []) {
  return [...entry, path.resolve(__dirname, "./register.js")];
}
export {
  managerEntries
};
