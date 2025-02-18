import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "src/user/entities/user.entity";
import {Transaction} from "src/transaction/entities/transaction.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({name:'categories_id'})
    id:number

    @Column()
    title:string

    @ManyToOne(() => User,(user) => user.categories)
    @JoinColumn({name:'user_id'})
    user:User
    @OneToMany(()=>Transaction, (transaction)=> transaction.categories)
    transactions:Transaction[]

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updateAt:Date
}
