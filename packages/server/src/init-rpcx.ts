import type { Providers } from "@iocx/types";
import { iocx } from "./iocx";

export function initiocx<E extends Providers = {}>(config?: { providers?: E }) {
  const ext = (config?.providers ?? {}) as E;
  return new iocx(ext);
}
