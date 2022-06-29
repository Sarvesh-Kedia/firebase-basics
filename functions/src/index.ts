import * as functions from "firebase-functions";
import * as express from "express";
import { addEntry, listAllEntries } from './entryController'


const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.post("/entries", addEntry)
app.get("/entries", listAllEntries)



exports.app = functions.https.onRequest(app);


// https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/