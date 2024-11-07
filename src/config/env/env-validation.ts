import * as yup from 'yup'

const envSchema = yup.object({
  POSTGRES_USER: yup.string().trim().required(),
  POSTGRES_PASSWORD: yup.string().trim().required(),
  POSTGRES_DB: yup.string().trim().required(),
  DATABASE_URL: yup.string().trim().required(),
})

export const envValidation = async () => {
  try {
    await envSchema.validate({
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DB: process.env.POSTGRES_DB,
      DATABASE_URL: process.env.DATABASE_URL,
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}
