import {FC, useState} from 'react';
import {AiFillCloseCircle, AiFillEdit} from "react-icons/ai";
import {Form, useLoaderData} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import {instance} from "../api/axios.api";
import CategoryModal from "../components/CategoryModal.tsx";
import {ICategory} from "../types/type.ts";

export const categoriesAction = async ({request}: any) => {
    switch (request.method) {
        case 'POST': {
            const forData = await request.formData()
            const title = {
                title: forData.get('title')
            }
            await instance.post('/categories', title)
            return null
        }
        case 'PATCH': {
            const forData = await request.formData()
            const category = {
                title: forData.get('title'),
                id:forData.get('id')
            }
            await instance.patch(`/categories/category/${category.id}`, category)
            return null
        }
        case 'DELETE': {
            const forData = await request.formData()
            const categoryID = forData.get('id')
            await instance.delete(`/categories/category/${categoryID}`)
            return null
        }
    }
}

export const categoryLoader = async () => {
    const {data} = await instance.get<ICategory[]>('/categories')
    return data
}
const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[]
    const [categoryId, setCategoryId] = useState<number>(0)
    const [isEdit,setIsEdit]=useState<boolean>(false)

    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    return (
        <>
            <div className="mt-10 rounded-md bg-slate-800 p-4">
                <h1>Your category list</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {
                        categories.map((category, index) => (
                            <div key={index}
                                 className="group py-2 px-4 relative flex items-center gap-2 rounded-lg bg-blue-600">
                                {category.title}
                                <div
                                    className="absolute px-3 top-0  left-0 bottom-0 right-0 rounded-lg hidden bg-black/90 items-center justify-between group-hover:flex">
                                    <button onClick={()=>{setCategoryId(category.id);setVisibleModal(true);setIsEdit(true)}}>
                                        <AiFillEdit/>
                                    </button>
                                    <Form className="flex" method={"delete"} action={"/categories"}>
                                        <input type="hidden" name={"id"} value={category.id}/>
                                        <button type={"submit"}>
                                            <AiFillCloseCircle/>
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button onClick={() => setVisibleModal(true)}
                        className={"mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"}>
                    <FaPlus/>
                    <span>Create a new category</span>
                </button>
            </div>
            {
                visibleModal && (
                    <CategoryModal type={"post"} setVisibleModal={setVisibleModal}/>
                )
            }
            {
                visibleModal && isEdit && (
                    <CategoryModal type={"patch"}  id={categoryId} setVisibleModal={setVisibleModal}/>
                )
            }
        </>

    );
};

export default Categories;
