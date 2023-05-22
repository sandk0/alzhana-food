export interface IProduct {
    image: string
    id: string
    title: string
    color: string
    description: string
    receipt: string
    tags: string[]
    amount: number
    price: string
}


export interface ICartProduct extends IProduct {
    count: number
}