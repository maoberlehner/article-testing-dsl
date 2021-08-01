import { WindowMsw } from './browser';

export type PreconditionPayload = Record<string, unknown>;
export type Precondition = (options: PreconditionPayload & { msw: WindowMsw }) => void;

export function prepare(precondition: Precondition, payload?: PreconditionPayload): void {
  cy.window().then(({ __MSW__ }) => {
    if (!__MSW__) throw new Error(`Make sure to load a page before preparing preconditions!`);
    precondition({ ...payload, msw: __MSW__ });
  });
}
