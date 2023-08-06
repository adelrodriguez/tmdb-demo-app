export type APIResponse<T> =
  | {
      data: T
      success: true
    }
  | {
      error: string
      success: false
    }
