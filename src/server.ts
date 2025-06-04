import type { Context, Core, MaybePromise } from "./utils";

const CTX = Symbol("ctx");

export class IOCX<C extends Context = {}> implements Core<C> {
  private [CTX]: C;
  private _instances = new Map<string, any>();

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

  get<K extends keyof C>(key: K): C[K] {
    if (!this._instances.has(key as string)) {
      const value = this[CTX][key];
      if (typeof value === "function") {
        // Suporte para "factory methods"
        const instance = value();
        this._instances.set(key as string, instance);
      } else {
        this._instances.set(key as string, value);
      }
    }
    return this._instances.get(key as string);
  }

  static __extractContext<T extends IOCX<any>>(
    r: T,
  ): T extends IOCX<infer C> ? C : never {
    return (r as any)[CTX];
  }
}
