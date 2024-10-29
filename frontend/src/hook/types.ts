export interface ApiError {
  message: string;
  success: false;
}

export interface TableMeta<MetaFilterType> {
  limit: number;
  page: number;
  search: string | null;
  orderBy: string | null;
  orderFieldName: string | null;
  metaFilters: MetaFilterType | null;
}

export interface TableApiResponseType<ResponseType> {
  success: true;
  data: ResponseType;
}
