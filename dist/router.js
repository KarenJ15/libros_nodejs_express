"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const libro_controller_1 = require("./controllers/libro.controller");
const router = (app) => {
    app.post("/libros", libro_controller_1.createLibro);
    app.get("/libros/:id", libro_controller_1.retrieveLibro);
    app.put("/libros/:id", libro_controller_1.updateLibro);
    app.delete("/libros/:id", libro_controller_1.deleteLibro);
    app.get("/libros", libro_controller_1.listLibros);
};
exports.router = router;
