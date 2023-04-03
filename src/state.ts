import path from "path";
import fs from "fs";

export enum LockState {
  LOCKED = "OFF",
  UNLOCKED = "ON",
}

function getFilePath(doorbellId: string) {
  return path.join(__dirname, `state_${doorbellId}`);
}

function encode(state: LockState) {
  return Buffer.from(JSON.stringify(state));
}

function decode(buffer: Buffer) {
  return JSON.parse(`${buffer}`);
}

/**
 * Read the state of the provided doorbell from a local file
 */
export function getState(doorbellId: any): LockState {
  try {
    const filePath = getFilePath(doorbellId);
    return decode(fs.readFileSync(filePath));
  } catch {
    return LockState.LOCKED;
  }
}

/**
 * Write the state of the provided doorbell to a local file.
 * Since the doorbell is configured to auto-lock,
 * the state needs to be reset after the request completes.
 */
export function setState(doorbellId: string, state: LockState) {
  const filePath = getFilePath(doorbellId);

  try {
    fs.writeFileSync(filePath, encode(state));
  } catch {}

  setTimeout(() => {
    try {
      fs.unlinkSync(filePath);
    } catch {}
  }, 100);
}
