import { RPCX } from "@iocx/server";

export function createiocxClient<R extends RPCX<any>>(
  router: R,
): { call: ReturnType<typeof RPCX.__extractContext> } {
  const ctx = RPCX.__extractContext(router);
  return {
    call: ctx,
  };
}
