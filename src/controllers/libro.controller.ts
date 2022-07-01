import { Request, Response } from 'express';
import { libro, ILibro } from "../models/libro.model";
import { IResponse } from "../models/response.model";

export const createLibro = async (req: Request, res: Response)=> {           
    const { tittle, Genero, dateOf, numpages, sinopsis }: ILibro = req.body;
    const response = await new LibroController().create({tittle, Genero, dateOf, numpages, sinopsis});         
    return res.status(response.status).json(response);
}

export const retrieveLibro = async (req: Request, res: Response) =>{
    const docId : String = req.params.id;
    const response = await new LibroController().retrieve(docId);
    return res.status(response.status).json(response);
}

export const updateLibro = async (req: Request, res: Response)=> {           
    const { tittle, Genero, dateOf, numpages, sinopsis } : ILibro = req.body;
    const docId : String = req.params.id; 
    const response = await new LibroController().update(docId, { tittle, Genero, dateOf, numpages, sinopsis });         
    return res.status(response.status).json(response);   
}

export const deleteLibro = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new LibroController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listLibros = async (req: Request, res: Response) => {
    const response = await new LibroController().list();         
    return res.status(response.status).json(response);
}

class LibroController {

   public async create(payload: ILibro) : Promise<IResponse> {
        const Libro = new libro(payload);
        return Libro.save().then(data => {
            return {
                message: "CREATED: Libro added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Libro",
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse>{
        const data = await libro.find({});
        return{
            message: "Success: All libros retrieved",
            status : 200,
            content : data
        }
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return libro.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Player not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Libro retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : ILibro) : Promise<IResponse>{
        return libro.updateOne({_id: docId} , { $set: { 
            tittle: payload.tittle,
            Genero: payload.Genero, 
            dateOf: payload.dateOf, 
            numpages: payload.numpages, 
            sinopsis: payload.sinopsis
          } }).then(data => {            
            return {
                message: "OK: Libro updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Libro not updated",
                status: 500,
                content : err
            }
        });
    }

    public async delete(docId: String) : Promise<IResponse> {
        return libro.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Libro not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Libro deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }
}