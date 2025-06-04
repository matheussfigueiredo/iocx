import { iocx } from "@iocx/server";

export function createiocxClient<R extends iocx<any>>(
  router: R,
): { call: ReturnType<typeof iocx.__extractContext> } {
  const ctx = iocx.__extractContext(router);
  return {
    call: ctx,
  };
}
