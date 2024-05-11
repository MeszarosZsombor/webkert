export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  package: string | null;
  bonuses: string[];
}
