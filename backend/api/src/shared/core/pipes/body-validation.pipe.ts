import {
    ArgumentMetadata,
    BadRequestException,
    Injectable, PipeTransform
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class BodyValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        try {
            if (!metatype || !this.toValidate(metatype)) {
                return value;
            }

            const object = plainToClass(metatype, value);
            const errors = await validate(object);
            if (errors.length > 0) {
                const message = errors
                    .map((error: ValidationError) => {
                        if (error.constraints) {
                            return Object.values(error.constraints);
                        }
                        if (error.children) {
                            return error.children.map((e: ValidationError) => {
                                if (e.constraints) {
                                    return `${error.property}.${Object.values(e.constraints)}`;
                                }
                            });
                        }
                    })
                    .join(', ');

                throw new BadRequestException(message);
            }
            return value;
        } catch (error) {
            throw new BadRequestException(error?.message || 'Internal server error');
        }
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
