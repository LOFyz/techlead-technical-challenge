export class GetUsersQuery {
  constructor(
    public readonly first?: number,
    public readonly after?: string,
    public readonly last?: number,
    public readonly before?: string,
  ) {}
}
