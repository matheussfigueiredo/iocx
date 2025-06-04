import { IOCX } from "@iocx/server";

export function createIOCXClient<R extends IOCX<any>>(router: R) {
  const ctx = IOCX.__extractContext(router);
  return {
    call: ctx,
  };
}
