import { IsPositive } from "class-validator";



export class dtoId{
    @IsPositive()
    readonly id:number
}