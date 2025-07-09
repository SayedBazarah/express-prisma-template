export interface SignUpDTO {
  email: string;
  name: string;
  phone?: string;
  password?: string;
  provider?: string;
  providerId?: string;
}
