import { NestFactory } from "@nestjs/core";
import { DarjeelingBookingReferenceModule } from "./darjeeling-booking-reference.module";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

main();
async function main() {
  const app = await NestFactory.create(DarjeelingBookingReferenceModule);
  app.useGlobalPipes(new ValidationPipe());
  withSwagger(app);

  await app.listen(7264);
  new Logger("(Darjeeling LTD.) - Booking Reference").log(
    "listening on 7264..."
  );
}

function withSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Darjeeling LTD. - Booking Reference")
    .build();
  const factory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, factory);
}
