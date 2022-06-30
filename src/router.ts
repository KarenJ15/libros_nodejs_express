import { Application } from "express";
import { createSolutionBuilderHost } from "typescript";
import {createLibro, deleteLibro, listLibros, retrieveLibro, updateLibro} from './controllers/libro.controller';

export const router = (app: Application)=>{
    app.post("/libros", createLibro);
    app.get("/libros/:id", retrieveLibro);
    app.put("/libros/:id", updateLibro);
    app.delete("/libros/:id", deleteLibro);
    app.get("/libros", listLibros); 
}