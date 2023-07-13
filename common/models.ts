export interface IContact {
    id: number
    value: string
    name: string
    contacttypeId?: number
    personId?: number
}
export interface IPerson {
    id: number
    name: number
    surname: number
    birthday: Date
}
export interface IContactType {
    id: number
    name: string
    exists: boolean
}
