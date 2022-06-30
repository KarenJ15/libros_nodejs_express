import {Schema, model} from 'mongoose';
import internal from 'stream';
export interface ILibro{
    tittle: null | String;
    Genero: String;
    dateOf: null | Date;
    numpages: Number | null;
    sinopsis: null | String;
}
const libroSchema = new Schema<ILibro>({
    tittle:{type:String},
    Genero:{type:String},
    dateOf:{type:Date},
    numpages:{type:Number},
    sinopsis:{type:String}
});
const libro = model <ILibro>('Libro', libroSchema);
export {libro};