export interface ISkill {
  id: number,
  created_at: string,
  tech: string,
  icon: string,
  description: string,
  level: number,
  experience: number,
  order: number,
  techDetails: IDetail[]
}

export interface IDetail {
  icon: string,
  name: string,
  color: string
}

export interface IButton {
  type?: HTMLButtonElement['type'],
  variant?: 'primary' | 'glitch' | 'link' | 'arrowed',
  disabled?: HTMLButtonElement['disabled'],
  onClick?: () => void,
  loading?: boolean,
}

export interface IProject {
  id: number,
  created_at: string,
  title: string,
  description: string,
  prj_stack: string,
  responsibilities: string,
  goal: string,
  images: string[],
  link: string,
  linkText: string,
  status: string,
  order: number,
  isPublished: boolean
}

export interface IPet {
  id: number,
  created_at: string,
  title: string,
  description: string,
  stack: string[],
  images: string[],
  order: number,
  url: string,
  isPublished: boolean,
  gitUrl: string,
}

export interface IContact {
  id: number,
  created_at: string,
  title: string,
  icon?: string,
  url: string,
  color?: string,
  order: number,
  isPublished: boolean,
}

export interface IExtra {
  id: number
  created_at: string
  title?: string
  icon?: string,
  description?: string,
  order: number
  isPublished: boolean
}