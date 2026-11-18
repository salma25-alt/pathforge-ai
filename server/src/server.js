// backend/src/server.js
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5013;
app.listen(PORT, () => {
  console.log(`Server running cleanly on http://localhost:${PORT}`);
});