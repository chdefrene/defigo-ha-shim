import express from "express";
import { getState, LockState, setState } from "./state";
import bodyParser from "body-parser";
import { openDoor } from "./defigo";

const app = express();

app.use(bodyParser.text());

/**
 * Get the current state of the provided doorbell
 */
app.get("/", (req, res) => {
  const { doorbell_id: doorbellId } = req.query;

  const state = getState(doorbellId);

  res.send(state);
});

/**
 * Set the state of the provided doorbell.
 * Accepts a `text/plain` payload of either "OFF" (lock) or "ON" (unlock).
 *
 * Since the doorbell is configured to auto-lock,
 * sending "OFF" will not perform any API calls.
 */
app.post("/", async (req, res) => {
  const { doorbell_id: doorbellId } = req.query;

  if (typeof doorbellId !== "string") {
    return res.status(400).send();
  }

  let status = 200;

  switch (req.body) {
    case LockState.UNLOCKED:
      status = await openDoor(doorbellId, req.headers);
      break;

    case LockState.LOCKED:
      break;
  }

  setState(doorbellId, req.body);

  res.status(status).send();
});

app.listen(3000, () => {
  console.info(`Server is running on http://localhost:3000`);
});
