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

export interface Notification {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _id: string;
  telegram_channel_ids: string[];
  email_list: string[];
  theme_id: string;
  admin_id: string;
  is_email: boolean;
  is_telegram: boolean;
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
  search_domains: Array<string>,
  materials_count_percent: number,
  today: any,
  total: any,
  week: any
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
  real_created_at: String,
  img_url: string | null | undefined
}

export interface Mode {
  key: any,
  label: string
}

export interface FilterItem {
  key: string,
  label: string,
  title: string
}

export interface Tone {
  negative: number
  neutral: number
  positive: number
  total: number
}

export interface Subs {
  created_at: string,
  updated_at: string,
  _id: string,
  chat_id: string,
  admin_id: string,
  name: string,
  description: null | string
}
