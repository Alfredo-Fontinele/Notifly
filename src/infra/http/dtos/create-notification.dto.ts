import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator'

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string

  @IsString()
  @Length(5, 240)
  category: string

  @IsString()
  content: string
}
