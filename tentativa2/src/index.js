import express from 'express';
import connectDatabase from './database/db.js';
import routes from './routes.js'; 
import mongoose from 'mongoose';
import Product from './models/Product.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}))
app.use(routes);

app.get("/products", async (req, res) => {
    const products = await Product.find()
    return res.json(products);
});

app.post("/products", async (req, res) =>{
    const prod = req.body
    const newProd = await Product.create(prod)  
    return res.json(newProd);
});

connectDatabase().then(() => {
    app.listen(3000, () => console.log("Servidor rodando e db conectado"));
})
.catch((error) => console.log(error));