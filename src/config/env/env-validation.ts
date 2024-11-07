import 'dotenv/config'
import * as yup from 'yup'

const envSchema = yup.object({
  PORT: yup.number().required(),
  POSTGRES_USER: yup.string().trim().required(),
  POSTGRES_PASSWORD: yup.string().trim().required(),
  POSTGRES_DB: yup.string().trim().required(),
  DATABASE_URL: yup.string().trim().required(),
  APPLICATION_URL: yup.string().trim().required(),
})

export type EnvSchema = yup.InferType<typeof envSchema>

export const variables: EnvSchema = {
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  APPLICATION_URL: process.env.APPLICATION_URL,
}

export const envValidation = async () => {
  try {
    await envSchema.validate({
      PORT: process.env.PORT,
      APPLICATION_URL: process.env.APPLICATION_URL,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DB: process.env.POSTGRES_DB,
      DATABASE_URL: process.env.DATABASE_URL,
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}
