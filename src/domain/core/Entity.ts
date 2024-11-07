import { randomUUID } from 'node:crypto'

export abstract class Entity<T> {
  protected _id: string
  public props: T

  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  get id() {
    return this._id
  }
}
