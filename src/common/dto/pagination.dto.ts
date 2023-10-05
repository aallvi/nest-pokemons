import { IsOptional, Min, IsPositive } from "class-validator";



export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?:number;


    @IsOptional()
    @IsPositive()
    offset?:number

}