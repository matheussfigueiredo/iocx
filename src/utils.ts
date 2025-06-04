import { IOCX } from "./server";

export type MaybePromise<T> = T | Promise<T>;

export type Context = Record<string, any>;

export type Factory<Ctx extends Context, T> = (ctx: Ctx) => MaybePromise<T>;

export type Factories<Ctx extends Context> = Record<string, Factory<Ctx, any>>;

export type Providers = Record<string, any>;

export type ExtractContext<T> = T extends IOCX<infer C> ? C : never;

export interface Core<C extends object> {
  bind<NewC extends object>(
    fn: NewC | ((args: { ctx: C }) => NewC),
  ): Core<C & NewC>;

  bind_async<NewC extends object>(
    fn: (args: { ctx: C }) => MaybePromise<NewC>,
  ): Promise<Core<C & Awaited<NewC>>>;

  get<K extends keyof C>(key: K): C[K];
}
