import app from "./app";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Krishi Sakhi backend running on port ${PORT}`);
});
