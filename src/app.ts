import express from "express";
import { getState, setState } from "./state";
import bodyParser from "body-parser";
import { openDoor } from "./defigo";

const app = express();

app.use(bodyParser.text());

/**
 * Get the current state of the provided doorbell
 */
app.get("/doorbells/:doorbellId", async (req, res) => {
  const { doorbellId } = req.params;

  const state = await getState(doorbellId);

  return res.json(state);
});

/**
 * Set the state of the provided doorbell.
 * Accepts a `text/plain` payload of either "ON" (lock) or "OFF" (unlock).
 *
 * Since the doorbell is configured to auto-lock,
 * sending "ON" will not perform any API calls.
 */
app.post("/doorbells/:doorbellId", async (req, res) => {
  const { doorbellId } = req.params;

  let status = 200;

  switch (req.body) {
    case "OFF":
      status = await openDoor(doorbellId, req.headers);
      break;
    case "ON":
    default:
      break;
  }

  setState(doorbellId);

  return res.status(status).send();
});

app.listen(3000, () => {
  console.info(`Server is running on http://localhost:3000`);
});
