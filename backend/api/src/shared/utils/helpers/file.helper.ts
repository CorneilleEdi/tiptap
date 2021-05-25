import { BadRequestException } from '@nestjs/common';

export class FileHelpers {
    static imageFileFilter = (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(
                new BadRequestException('Only image files are allowed (jpg|jpeg|png)!'),
                false,
            );
        }
        callback(null, true);
    };
}
