export interface Profile {
  admin_id: string,
  company_name: string,
  email: string,
  first_name: string | null,
  is_active: boolean,
  last_name: string | null,
  middle_name: string | null,
  photo_url: string | null,
  role: string,
  timezone: string,
  _id: string
}

export interface Theme {
  created_at: string,
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

export interface Tags {
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  _id: string,
  name: string
}

export interface Material {
  title: string,
  description: string,
  created_at: string,
  updated_at: string,
  _id: string,
  language: string,
  url: string,
  comments_number: number,
  likes_number: number,
  reposts_number: number,
  views_number: number,
  source: {
    source_type: string,
    name: string,
    url: string
  },
  country_id: string | null,
  city_id: string | null,
  author_id: string | null,
  theme_id: string,
  sentiment: string | null,
  tags: ReadonlyArray<any>,
  real_created_at: String
}

export interface Mode {
  key: string,
  label: string
}
