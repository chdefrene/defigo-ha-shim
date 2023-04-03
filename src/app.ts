import express from "express";
import { getState, setState } from "./state";
import bodyParser from "body-parser";
import { openDoor } from "./defigo";

const app = express();

app.use(bodyParser.text());

/**
 * Get the current state of the provided doorbell
 */
app.get("/doorbells/:doorbellId", (req, res) => {
  const { doorbellId } = req.params;

  const state = getState(doorbellId);

  res.json(state);
});

/**
 * Set the state of the provided doorbell.
 * Accepts a `text/plain` payload of either "OFF" (lock) or "ON" (unlock).
 *
 * Since the doorbell is configured to auto-lock,
 * sending "OFF" will not perform any API calls.
 */
app.post("/doorbells/:doorbellId", async (req, res) => {
  const { doorbellId } = req.params;

  let status = 200;

  switch (req.body) {
    // Unlock
    case "ON":
      status = await openDoor(doorbellId, req.headers);
      break;

    // Lock
    case "OFF":
      break;
  }

  setState(doorbellId, req.body);

  res.status(status).send();
});

app.listen(3000, () => {
  console.info(`Server is running on http://localhost:3000`);
});
