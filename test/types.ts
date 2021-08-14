import { rest, SetupWorkerApi } from 'msw';
import { SetupServerApi } from 'msw/node';

export type Step = () => Step[]|void|unknown|Promise<unknown>;
export type Run = (steps: Step[]) => () => void;

export type MswContext = { rest: typeof rest, server: SetupServerApi|SetupWorkerApi };

export type NetworkMockAction = `get`|`post`;
export type NetworkMock = {
  action: NetworkMockAction,
  body: Record<number|string, unknown>,
  endpoint: string,
  status?: number,
};
export type QueueNetworkMock = (networkMock: NetworkMock) => void;

export type PreconditionOptions<Payload> = {
  queueNetworkMock: QueueNetworkMock,
  payload?: Payload,
};
export type Precondition = <Payload>(options: PreconditionOptions<Payload>) => void;
