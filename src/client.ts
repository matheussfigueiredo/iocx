import { RPCX } from "./server";

export function createRPCXClient<R extends RPCX<any>>(router: R) {
  const ctx = RPCX.__extractContext(router);
  return {
    call: ctx,
  };
}
