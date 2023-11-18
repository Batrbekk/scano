export interface Profile {
  admin_id: string,
  company_name: string,
  email: string,
  first_name: string | null,
  is_active: boolean,
  last_name: string | null,
  middle_name: string | null,
  photo_url: string | null,
  role: string
}
