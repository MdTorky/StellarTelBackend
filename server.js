import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

console.log("Server is starting...");
console.log("PORT:", PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded ✅" : "Not Found ❌");

app.use(cors());
app.use(express.json());
app.use("/api", contactRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Error connecting to MongoDB:", error.message);
    });
