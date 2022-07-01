"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.libro = void 0;
const mongoose_1 = require("mongoose");
const libroSchema = new mongoose_1.Schema({
    tittle: { type: String },
    Genero: { type: String },
    dateOf: { type: Date },
    numpages: { type: Number },
    sinopsis: { type: String }
});
const libro = (0, mongoose_1.model)('Libro', libroSchema);
exports.libro = libro;
