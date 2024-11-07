declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number
    DATABASE_URL: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
  }
}
