type Dict = Record<string, any>;

export type ReturnedEntity<T extends Delegate> = Awaited<
  ReturnType<T['findMany']>
>[number];
export class Delegate {
  findMany!: (arg: {
    select?: Dict | null;
    include?: any; // todo
    where?: Dict;
    orderBy?: unknown | unknown[];
    cursor?: Dict;
    take?: number;
    skip?: number;
    distinct?: unknown | unknown[];
  }) => Promise<unknown[]>;

  count!: (arg: { where?: Dict }) => Promise<number>;
}
