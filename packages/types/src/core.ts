export type MaybePromise<T> = T | Promise<T>;

export interface Core<C extends object> {
  bind<NewC extends object>(
    fn: NewC | ((args: { ctx: C }) => NewC)
  ): Core<C & NewC>;

  bind_async<NewC extends object>(
    fn: (args: { ctx: C }) => MaybePromise<NewC>
  ): Promise<Core<C & Awaited<NewC>>>;
}
