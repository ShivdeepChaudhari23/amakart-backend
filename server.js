import mongoose from "mongoose";
import { config } from "dotenv";
import app from './app.js';

config({ path: './config.env' });

const DBCon = process.env.DB_CON;
const port = 4443;

mongoose.connect(DBCon, {
  useNewUrlParser: true,
}).then(() => console.log("MongoDB Connection Live now"));

app.listen(port, () => {
    console.log("Serving on port no : %o 🚀", port);
})