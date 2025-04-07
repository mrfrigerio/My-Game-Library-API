export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  address: {
    type: string;
    zip_code: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement?: string;
  }[];
}
