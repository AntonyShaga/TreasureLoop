import {FC, useState} from 'react';
import {Form, useLoaderData} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import {IRsponseTransactionLoader} from "../types/type.ts";
import CategoryModal from "../components/CategoryModal.tsx";

const Transaction: FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const {categories} = useLoaderData() as IRsponseTransactionLoader
    return (
        <div className={"rounded-md bg-slate-800 p-4"}>
            <Form method={"post"} action={"/transactions"} className={"grid gap-2"}>
                <label className={"grid"} htmlFor={"title"}>
                    <span>Title</span>
                    <input type="text" placeholder={"Title..."} className={"input border-slate-700"} required={true}
                           name={"title"}/>
                </label>
                <label className={"grid"} htmlFor={"amount"}>
                    <span>Amount</span>
                    <input type="number" placeholder={"Amount..."} className={"input border-slate-700"} required={true}
                           name={"amount"}/>
                </label>

                {
                    categories.length ? (
                        <label className={"grid"} htmlFor="category">
                            <span>Category</span>
                            <select id={"category"} className={"input border-slate-700 bg-inherit text-inherit"} name="category" required={true}>
                                {
                                    categories.map((el,index) => (
                                        <option key={index} value={el.id}>{el.title}</option>
                                    ))
                                }
                            </select>
                        </label>
                    ) : (<h1 className={"mt-1 text-red-300"}>To continue create categorie first</h1>)
                }
                <button onClick={() => setVisibleModal(true)}
                    className={"mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"}>
                    <FaPlus/>
                    <span>Manage Categories</span>
                </button>
                <div className={"flex items-center gap-4"}>
                    <label className={"flex cursor-pointer items-center gap-2"}>
                        <input type="radio" className={"form-radio text-blue-600"} name={"type"} value={"income"}/>
                        <span>Income</span>
                    </label>
                    <label className={"flex cursor-pointer items-center gap-2 "}>
                        <input type="radio" className={"form-radio text-blue-600"} name={"type"} value={"expense"}/>
                        <span>Expense</span>
                    </label>
                </div>
                <button className={"btn btn-green max-w-fit mt-2"}> Submmit</button>
            </Form>
            {
                visibleModal && (
                    <CategoryModal type={"post"} setVisibleModal={setVisibleModal}/>
                )
            }
        </div>
    );
};

export default Transaction;
