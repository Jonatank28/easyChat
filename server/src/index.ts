import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import http from "http";
import { Server } from "socket.io";
import { configurePassport } from "./config/configurePassport";

dotenv.config();

const app: Application = express();

connectDB();

// Configuração do passport
configurePassport();

// Middleware
app.use(cors());
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//  Configuração do socket
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Porta
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
