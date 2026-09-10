import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

export const handleDBException = (error: any, logger?: Logger): never => {
  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  if (logger) {
    logger.error(error.message || error.detail || error, error.stack);
  }

  throw new InternalServerErrorException(
    'Error inesperado; consulte el registro del servidor.',
  );
};
