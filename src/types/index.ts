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

export interface Theme {
  _id: string,
  name: string,
  group_id?: string | null,
  user_id: string,
  theme_type: string,
  keywords: Array<string>,
  minus_keywords: Array<string>,
  source_types: Array<string>,
  material_types: Array<string>,
  search_domains: Array<string>
}
