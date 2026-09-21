import express from "express";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "HabitFlow API funcionando",
  });
});

app.use("/api/habits", habitRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});