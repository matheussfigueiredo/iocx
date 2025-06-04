import type { Context, Core, MaybePromise } from "@rpcx/types";

const CTX = Symbol("ctx");

export class RPCX<C extends Context = {}> implements Core<C> {
  private [CTX]: C;

  constructor(ctx: C) {
    this[CTX] = ctx;
  }

  bind<NewC extends object>(
    factoryOrObject: NewC | ((args: { ctx: C }) => NewC),
  ): RPCX<C & NewC> {
    const isFunction = typeof factoryOrObject === "function";

    const newBindings = isFunction
      ? factoryOrObject({ ctx: this[CTX] })
      : factoryOrObject;

    return new RPCX({ ...this[CTX], ...newBindings });
  }

  async bind_async<NewC extends object>(
    factory: (args: { ctx: C }) => MaybePromise<NewC>,
  ): Promise<RPCX<C & Awaited<NewC>>> {
    const newBindings = await factory({ ctx: this[CTX] });
    return new RPCX({ ...this[CTX], ...newBindings });
  }

  static __extractContext<T extends RPCX<any>>(
    r: T,
  ): T extends RPCX<infer C> ? C : never {
    return (r as any)[CTX];
  }
}
