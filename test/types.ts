import { rest, SetupWorkerApi } from 'msw';
import { SetupServerApi } from 'msw/node';

export type MswContext = { rest: typeof rest, server: SetupServerApi|SetupWorkerApi };

export type MockAction = `get`|`post`;
export type Mock = {
  action: MockAction,
  body: Record<number|string, unknown>,
  endpoint: string,
  status?: number,
};

export type TestId = string;
export type Step = () => Step[]|void|Promise<void>;
export type Run = (steps: Step[]) => () => void;
export type GoTo<ReturnType> = (view: string) => ReturnType;
export type Type<ReturnType> = (testId: TestId, text: string) => ReturnType;
export type Click<ReturnType> = (testId: TestId) => ReturnType;
export type Submit<ReturnType> = (testId: TestId) => ReturnType;
export type AssertShouldExist<ReturnType> = (testId: TestId) => ReturnType;
export type AssertShouldNotExist<ReturnType> = (testId: TestId) => ReturnType;
export type QueueMock = (mock: Mock) => void;

export type PreconditionOptions<Payload> = {
  queueMock: QueueMock,
  payload?: Payload,
};
export type Precondition = <Payload>(options: PreconditionOptions<Payload>) => void;
