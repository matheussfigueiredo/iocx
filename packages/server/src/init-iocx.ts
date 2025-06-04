import type { Providers } from "@iocx/types";
import { IOCX } from "./iocx";

export function initIOCX<E extends Providers = {}>(config?: { providers?: E }) {
  const ext = (config?.providers ?? {}) as E;
  return new IOCX(ext);
}
