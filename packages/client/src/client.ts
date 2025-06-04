import { RPCX } from "@rpcx/server";

export function createRPCXClient<R extends RPCX<any>>(
  router: R,
): { call: ReturnType<typeof RPCX.__extractContext> } {
  const ctx = RPCX.__extractContext(router);
  return {
    call: ctx,
  };
}
