"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLibros = exports.deleteLibro = exports.updateLibro = exports.retrieveLibro = exports.createLibro = void 0;
const libro_model_1 = require("../models/libro.model");
const createLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tittle, Genero, dateOf, numpages, sinopsis } = req.body;
    const response = yield new LibroController().create({ tittle, Genero, dateOf, numpages, sinopsis });
    return res.status(response.status).json(response);
});
exports.createLibro = createLibro;
const retrieveLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new LibroController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveLibro = retrieveLibro;
const updateLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tittle, Genero, dateOf, numpages, sinopsis } = req.body;
    const docId = req.params.id;
    const response = yield new LibroController().update(docId, { tittle, Genero, dateOf, numpages, sinopsis });
    return res.status(response.status).json(response);
});
exports.updateLibro = updateLibro;
const deleteLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new LibroController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteLibro = deleteLibro;
const listLibros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new LibroController().list();
    return res.status(response.status).json(response);
});
exports.listLibros = listLibros;
class LibroController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const Libro = new libro_model_1.libro(payload);
            return Libro.save().then(data => {
                return {
                    message: "CREATED: Libro added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Libro",
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield libro_model_1.libro.find({});
            return {
                message: "Success: All libros retrieved",
                status: 200,
                content: data
            };
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return libro_model_1.libro.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Libro retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return libro_model_1.libro.updateOne({ _id: docId }, { $set: {
                    tittle: payload.tittle,
                    Genero: payload.Genero,
                    dateOf: payload.dateOf,
                    numpages: payload.numpages,
                    sinopsis: payload.sinopsis
                } }).then(data => {
                return {
                    message: "OK: Libro updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Libro not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return libro_model_1.libro.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Libro not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Libro deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
}
