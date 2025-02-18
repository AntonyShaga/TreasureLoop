import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types'; // Убедись, что IUser правильно определён

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        // Проверяем JWT_SECRET при инициализации
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined!');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    // Метод для валидации полезной нагрузки (payload) из токена
    async validate(payload: IUser) {
        // Здесь можно добавить дополнительные проверки, например, искать пользователя по id в базе данных
        return { id: payload.id, email: payload.email }; // Передаем только необходимые данные
    }
}

