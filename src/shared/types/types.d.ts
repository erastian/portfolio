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
  order: number,
  link: string,
  status: string,
  isPublished: boolean
}