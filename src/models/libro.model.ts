import {Schema, model} from 'mongoose';

export interface ILibro{
    tittle: null | String;
    Genero: null | String;
    dateOf: null | Date;
    numpages: null | Number;
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
export {libro}