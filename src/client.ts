import { IOCX } from "./server";
import { ExtractContext, Providers } from "./utils";

export function createIOCXClient<R extends IOCX<any>>(router: R) {
  const context = IOCX.__extractContext(router) as ExtractContext<R>;
  const cache = new Map<keyof ExtractContext<R>, unknown>();

  function get<K extends keyof ExtractContext<R>>(
    key: K,
  ): ExtractContext<R>[K] {
    if (cache.has(key)) {
      return cache.get(key) as ExtractContext<R>[K];
    }

    const target = context[key];
    const instance = typeof target === "function" ? target() : target;

    cache.set(key, instance);
    return instance;
  }

  return {
    call: context,
    get,
  };
}

export function initIOCX<E extends Providers = {}>(config?: { providers?: E }) {
  const ext = (config?.providers ?? {}) as E;
  return new IOCX(ext);
}
