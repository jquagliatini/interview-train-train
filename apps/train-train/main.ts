import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { TrainTrainModule } from "./train-train.module";

main();
async function main() {
  const app = await NestFactory.create(TrainTrainModule);
  app.useGlobalPipes(new ValidationPipe());
  withSwagger(app);

  await app.listen(3000);
  new Logger("Train Train").log("listening on 3000...");
}

function withSwagger(app: INestApplication): void {
  const config = new DocumentBuilder().setTitle("Train Train API").build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_, methodKey) => methodKey,
    });
  SwaggerModule.setup("api", app, documentFactory);
}
