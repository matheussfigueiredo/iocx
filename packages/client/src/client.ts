import { IOCX } from "@iocx/server";

export function createRPCXClient<R extends IOCX<any>>(
  router: R,
): {
  call: ReturnType<typeof IOCX.__extractContext>;
} {
  const ctx = IOCX.__extractContext(router);
  return {
    call: ctx,
  };
}
