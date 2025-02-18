import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "src/transaction/entities/transaction.entity";
import {Repository} from "typeorm";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>) {}

    async create(createTransactionDto: CreateTransactionDto, id: number) {

        const newTransaction = {
            title: createTransactionDto.title,
            amount: createTransactionDto.amount,
            type: createTransactionDto.type,
            categories: {id: +createTransactionDto.categories},
            user: {id},
        }

        if (!newTransaction) throw new BadRequestException('Somethins went wrong...')

        return await this.transactionRepository.save(newTransaction)
    }

    async findAll(id: number) {
        const transactions = await this.transactionRepository.find({
            where: {
                user: {id}
            },
            relations: {
                categories:true
            },
            order: {
                createdAt: 'DESC'
            }
        })
        return transactions;
    }

    async findOne(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id,
            },
            relations: {
                categories: true,
                user: true
            }
        })
        if (!transaction) throw new NotFoundException('Transaction not found!')
        return transaction;
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id
            }
        })
        if (!transaction) throw new NotFoundException('Transactionnot found!')
        return await this.transactionRepository.update(id, updateTransactionDto);
    }

    async remove(id: number) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id
            }
        })
        if (!transaction) throw new NotFoundException('Transactionnot found!')
        return await this.transactionRepository.delete(id);
    }

    async findAllWithPagination(id: number, page: number, limit: number) {
        const transaction = await this.transactionRepository.find({
            where: {
               user: {id},
            },
            relations: {
                //categories: true,
                //user: true
            },
            order: {
                createdAt:'DESC'
            },
            take:limit,
            skip:(page -1) * limit
        })

        return transaction;
    }
    async findAllByType(id:number,type:string) {
        const transaction = await this.transactionRepository.find({
            where: {
                user: {id},
                type,
            }
        })
        const total = transaction.reduce((acc,obj)=>acc + obj.amount,0)
        return total
    }
}
