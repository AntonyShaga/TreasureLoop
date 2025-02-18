import {Category} from "src/category/entities/category.entity";
import {User} from "src/user/entities/user.entity";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    @IsNumber()
    amount:number

    @IsNotEmpty()
    @IsEnum(['expense', 'income'], { message: 'Type must be either "expense" or "income"' })
    type: 'expense' | 'income';

    @IsNotEmpty()
    categories: Category

    @IsOptional()
    user?: User
}
