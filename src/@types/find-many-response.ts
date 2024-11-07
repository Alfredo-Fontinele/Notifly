export type FindManyResponse<T> = {
  currentPage: number
  nextUrl: string | null
  prevUrl: string | null
  data: T
}
