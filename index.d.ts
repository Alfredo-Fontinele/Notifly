declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number
    APPLICATION_URL: string
    DATABASE_URL: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
  }
}
