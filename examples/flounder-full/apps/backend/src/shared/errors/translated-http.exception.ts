import { HttpException } from "@nestjs/common";

export abstract class TranslatedHttpException extends HttpException {
  abstract translationKey: string;
}
