import { Context } from "./context";
import { MaybePromise } from "./core";

export type Factory<Ctx extends Context, T> = (ctx: Ctx) => MaybePromise<T>;

export type Factories<Ctx extends Context> = Record<string, Factory<Ctx, any>>;
