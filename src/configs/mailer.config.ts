import { MailerOptions } from'@nestjs-modules/mailer';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer'; // Sugerido pelo tutorial
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // Sugerido pela documentação
import * as path from 'path';

export const mailerConfig: MailerOptions = {
    template: {
        dir: path.resolve(__dirname, '..', '..', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            eextName: '.hbs',
            layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
        },
    },
    transport: `smtps://alguem@gmail.com:senha-super-secreta@smtp.gmail.com`
<<<<<<< HEAD
}
=======
}
>>>>>>> 8c68221d6c3da080a1b8a6f3671b3a3a5c60c81d
