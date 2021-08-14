import { rest, SetupWorkerApi } from 'msw';
import { SetupServerApi } from 'msw/node';

export type Step = () => Step[]|void|unknown|Promise<unknown>;
export type Run = (steps: Step[]) => () => void;

export type MswContext = { rest: typeof rest, server: SetupServerApi|SetupWorkerApi };

export type PrepareAction = `get`|`post`;
export type PrepareOptions = {
  action: PrepareAction,
  body: Record<number|string, unknown>,
  endpoint: string,
  status?: number,
};
export type Prepare = (options: PrepareOptions) => Promise<void>;
