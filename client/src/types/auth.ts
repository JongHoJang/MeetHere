type Community =
  | '요셉'
  | '다윗'
  | '에스더'
  | '여호수아'
  | '다니엘'
  | '모세'
  | '쁘아'

export interface LoginForm {
  email: string
  password: string
}

export interface SignUpForm extends LoginForm {
  name: string
  birthDate: string
  teacherId: string
  community: Community
}
