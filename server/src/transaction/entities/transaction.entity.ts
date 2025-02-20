import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "src/user/entities/user.entity";
import {Category} from "src/category/entities/category.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: 'transaction_id'})
    id:number

    @Column()
    title:string

    @Column({nullable:true})
    type:string

    @ManyToOne(()=> User, (user)=>user.transactions)
    @JoinColumn({name:'user_id'})
    user:User

    @ManyToOne(()=> Category,(category)=> category.transactions, {onDelete:'CASCADE'})
    @JoinColumn({name:'categories_id'})
    categories: Category

    @Column()
    amount:number

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date
}
