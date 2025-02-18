import {FC, useEffect, useState} from 'react';
import {FaTrash} from "react-icons/fa";
import {Form, useLoaderData} from "react-router-dom";
import {IRsponseTransactionLoader, ITransaction} from "../types/type.ts";
import {formateDate} from "../helpers/date.helper.ts";
import {formatToUSD} from "../helpers/currency.ts";
import {instance} from "../api/axios.api.ts";
import ReactPaginate from "react-paginate";

interface ITransactionTable {
    limit: number
}

const TransactionTable: FC<ITransactionTable> = ({limit = 2}) => {
    const {transactions} = useLoaderData() as IRsponseTransactionLoader
    console.log(transactions)
    const [data, setData] = useState<ITransaction[]>([])
    const [curentPage, setCurentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(0)

    const featchTransaction = async (page:number) => {
        const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`)
        setData(response.data)
        console.log(response.data)
        setTotalPage(Math.ceil(transactions.length / limit))
    }
    const handlePageChange  = (selectedItem: {selected:number}) => {
        setCurentPage(selectedItem.selected + 1)
    }
    useEffect(()=> {
        featchTransaction(curentPage)
    },[curentPage, transactions])
    return (
        <>
            <ReactPaginate
                className={"flex gap-3 justify-end mt-4 items-center"}
                activeClassName={"bg-blue-600 rounded-md"}
                pageLinkClassName={"text-white text-xs py-1 px-2 rounded-sm"}
                previousClassName={"text-white text-xs py-1 px-2 rounded-sm bg-slate-800 text-xs"}
                nextClassName={"text-white text-xs py-1 px-2 rounded-sm bg-slate-800 text-xs"}
                disabledClassName={"text-white/50 cursor-not-allowed"}
                disabledLinkClassName={"text-slate-600 cursor-not-allowed"}
                pageCount={totalPage}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}

            />
            <div className={"mt-4 rounded-md bg-slate-800 px-4 py-3"}>
                <table className={"w-full"}>
                    <thead>
                    <tr>
                        <td className="font-bold">N</td>
                        <td className="font-bold">Title</td>
                        <td className="font-bold">Amount</td>
                        <td className="font-bold">Category</td>
                        <td className="font-bold">Date</td>
                        <td className="text-right">Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.map((el, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el.title}</td>
                                <td className={el.type === "income" ? "text-green-500" : "text-red-500"}>
                                    {el.type === "income"
                                        ? `+${formatToUSD.format(el.amount)}`
                                        : `-${formatToUSD.format(el.amount)}`
                                    }
                                </td>
                                <td>{el.categories?.title}</td>
                                <td>{formateDate(el.createdAt)}</td>
                                <td>
                                    <Form method={'delete'} action={'/transactions'}>
                                        <input type="hidden" name={'id'} value={el.id}/>
                                        <button className={"btn hover:btn-red ml-auto"}><FaTrash/></button>
                                    </Form>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TransactionTable;
