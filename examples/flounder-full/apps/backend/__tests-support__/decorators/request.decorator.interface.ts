import supertest from 'supertest';
import { TokenBuilder } from '../token.builder';

export type TestRequestDecorator = (
  request: TestRequest,
  tokenExtender?: TokenExtender,
) => TestRequest;

export type TestRequest = (...args: any[]) => supertest.Test;

export type TokenExtender = (builder: TokenBuilder) => TokenBuilder;
