import "dotenv/config";
import express from "express";

console.log("Hello World!");
console.log("MY_SECRET", process.env.MY_SECRET);
console.log("PYTHON_ROOT", process.env.PYTHON_ROOT);

const app = express();

app.get("/", (req, res) => {
    res.send("Bem-vindo ao Express de Beatriz Costa, aka Bea!");
});


export default app;
