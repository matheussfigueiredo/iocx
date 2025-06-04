import { IOCX } from "./server";
import { Providers } from "./utils";

export function createIOCXClient<R extends IOCX<any>>(router: R) {
  const ctx = IOCX.__extractContext(router);
  return {
    call: ctx,
  };
}

export function initIOCX<E extends Providers = {}>(config?: { providers?: E }) {
  const ext = (config?.providers ?? {}) as E;
  return new IOCX(ext);
}
