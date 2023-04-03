import path from "path";
import fs from "fs";
import { AUTO_LOCK_TIMEOUT } from "./defigo";

interface State {
  is_open: boolean;
}

function getFilePath(doorbellId: string) {
  return path.join(__dirname, `state_${doorbellId}`);
}

function encode(state: State) {
  return Buffer.from(JSON.stringify(state));
}

function decode(buffer: Buffer) {
  return JSON.parse(`${buffer}`);
}

/**
 * Read the state of the provided doorbell from a local file
 */
export function getState(doorbellId: string): State {
  const filePath = getFilePath(doorbellId);

  try {
    return decode(fs.readFileSync(filePath));
  } catch {
    return { is_open: false };
  }
}

/**
 * Write the state of the provided doorbell to a local file.
 * Since the doorbell is configured to auto-lock,
 * the state will be reset after the timout is exceeded.
 */
export function setState(doorbellId: string, action: "ON" | "OFF") {
  const filePath = getFilePath(doorbellId);
  const state: State = { is_open: action === "ON" };

  try {
    fs.writeFileSync(filePath, encode(state));
  } catch {}

  setTimeout(() => {
    try {
      fs.unlinkSync(filePath);
    } catch {}
  }, AUTO_LOCK_TIMEOUT);
}
