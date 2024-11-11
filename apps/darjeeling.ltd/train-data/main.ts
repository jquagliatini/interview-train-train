import { NestFactory } from "@nestjs/core";
import { DarjeelingTrainDataModule } from "./darjeeling-data.module";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

main();
async function main() {
    const app = await NestFactory.create(DarjeelingTrainDataModule);
    app.useGlobalPipes(new ValidationPipe());
    withSwagger(app);
    await app.listen(7177);
    new Logger('(Darjeeling LTD.) - Train Data').log('listening on 7177...');
}

function withSwagger(app: INestApplication): void {
    const config = new DocumentBuilder().setTitle('Darjeeling LTD. - Train Data').build();
    const factory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, factory);
}