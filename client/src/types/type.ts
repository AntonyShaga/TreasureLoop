export interface IUserData {
    email: string
    password: string
}

export interface IResponseUser {
    email: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}

export interface IUser {
    id:number
    email:string
    token:string
}
export interface ICategory {
    title:string
    id:number
    createdAt:string
    updatedAt:string
    transactions?:[]
}

export interface IRsponseTransactionLoader {
    categories:ICategory[]
    transactions:ITransaction[]
    totalIncome:number
    totalExpense:number
}

export interface ITransaction {
    title:string
    type:string
    id:number
    amount:number
    createdAt:string
    updatedAt:string
    categories:ICategory
}
