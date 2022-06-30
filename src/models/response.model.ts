import { ILibro } from "./libro.model";

export interface IResponse {    
    message: string;
    status: number;
    content: null | any;    
}

export interface IResponseLibros {    
    message: string;
    status : number;
    Libros: null | ILibro[];    
}