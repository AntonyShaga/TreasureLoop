import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "src/category/entities/category.entity";
import {Transaction} from "src/transaction/entities/transaction.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    password:string

    @OneToMany(()=> Category,(category:Category)=>category.user,{onDelete:'CASCADE'})
    categories: Category[]

    @OneToMany(() => Transaction, (transaction:Transaction) => transaction.user,{onDelete:'CASCADE'})
    transactions:Transaction[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date
}
