export interface ConnectExecDto {
  host: string
  user: string
  password: string
  port: number
  defaultDatabase: string
}

export interface QueryExecDto extends ConnectExecDto {
  query: string
}
