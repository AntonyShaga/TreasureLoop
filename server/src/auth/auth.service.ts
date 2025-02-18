import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateAuthDto} from './dto/create-auth.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {UserService} from "src/user/user.service";
import * as argon2 from 'argon2'
import {JwtService} from "@nestjs/jwt";
import {IUser} from "src/types/types";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user || !await argon2.verify(user.password, password)) throw new UnauthorizedException('User or password are incorrect')
        return user
    }

    async login(user: IUser) {
        const {id, email} = user;
        return {
            id, email, token: this.jwtService.sign({id: user.id, email: user.email})
        };
    }

    create(createAuthDto: CreateAuthDto) {
        return 'This action adds a new auth';
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
