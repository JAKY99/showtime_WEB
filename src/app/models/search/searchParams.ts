export interface SearchParamsModel {
  pageNumber: number | undefined,
  limitRow: number | undefined,
  sort: {
    sortField: string | undefined | null,
    sortOrder: number | undefined | null
  },
  filters: Object | undefined | null
}
