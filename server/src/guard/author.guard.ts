import {CanActivate, ExecutionContext, Injectable, NotFoundException} from "@nestjs/common";
import {TransactionService} from "src/transaction/transaction.service";
import {CategoryService} from "src/category/category.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly transactionSevice: TransactionService,
        private readonly categoryService: CategoryService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const {id, type} = request.params

        let entyty
        switch (type) {
            case 'transaction':
                entyty = await this.transactionSevice.findOne(id)
                break
            case 'category':
                entyty = await this.categoryService.findOne(id)
                break
            default:
                throw new NotFoundException('Something went wrong!')
        }
        const user = request.user
        if (entyty && user && entyty.user.id === user.id) {
            return true
        }
        return false
    }
}
