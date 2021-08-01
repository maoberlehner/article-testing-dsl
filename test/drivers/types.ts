import { rest, SetupWorkerApi } from 'msw';
import { SetupServerApi } from 'msw/node';

export type MswContext = { rest: typeof rest, server: SetupServerApi|SetupWorkerApi }
export type PreconditionPayload = Record<string, unknown>;
export type Precondition = (options: PreconditionPayload & { msw: MswContext }) => void;
