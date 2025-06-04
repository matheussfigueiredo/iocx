import type { Context, Core, MaybePromise } from "@iocx/types";

const CTX = Symbol("ctx");

export class IOCX<C extends Context = {}> implements Core<C> {
  private [CTX]: C;

  constructor(ctx: C) {
    this[CTX] = ctx;
  }

  bind<NewC extends object>(
    factoryOrObject: NewC | ((args: { ctx: C }) => NewC),
  ): IOCX<C & NewC> {
    const isFunction = typeof factoryOrObject === "function";

    const newBindings = isFunction
      ? factoryOrObject({ ctx: this[CTX] })
      : factoryOrObject;

    return new IOCX({ ...this[CTX], ...newBindings });
  }

  async bind_async<NewC extends object>(
    factory: (args: { ctx: C }) => MaybePromise<NewC>,
  ): Promise<IOCX<C & Awaited<NewC>>> {
    const newBindings = await factory({ ctx: this[CTX] });
    return new IOCX({ ...this[CTX], ...newBindings });
  }

  static __extractContext<T extends IOCX<any>>(
    r: T,
  ): T extends IOCX<infer C> ? C : never {
    return (r as any)[CTX];
  }
}
