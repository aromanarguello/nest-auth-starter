import { IsString, IsUrl, MinLength } from 'class-validator';

export class CreateUserProfile {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  middleName?: string;

  @IsUrl()
  imageUrl?: string;

  phoneNumber?: string;
}
