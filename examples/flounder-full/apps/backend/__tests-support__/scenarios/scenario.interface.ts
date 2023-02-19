import { Test } from 'supertest';
import { INestApplication } from "@nestjs/common";
import {TestingAppRunner} from "../setup-testing-app";

export type IScenario = (appRunner: TestingAppRunner, request: (app: INestApplication) => Test, ...args: any[]) => void;
