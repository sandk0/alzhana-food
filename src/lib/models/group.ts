import { IProduct } from "./product"

export interface IGroup {
    id: string
    name: string
    color: string
    products: IProduct[]
}