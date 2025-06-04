import type { Providers } from "@rpcx/types";
import { RPCX } from "./rpcx";

export function initRPCX<E extends Providers = {}>(config?: { providers?: E }) {
  const ext = (config?.providers ?? {}) as E;
  return new RPCX(ext);
}
