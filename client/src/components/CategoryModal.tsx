import {FC} from 'react';
import {Form} from "react-router-dom";
interface ICategoryModal {
    id?:number
    type:'post' | 'patch'
    setVisibleModal:(visible:boolean)=>void
}

const CategoryModal: FC<ICategoryModal> = ({type,id,setVisibleModal}) => {
    return (
        <div className={"fixed bottom-0 top-0 left-0 right-0 flex h-full w-full items-center justify-center bg-black/50"}>
            <Form className={"grid w-[300px] rounded-md bg-slate-900 p-5"} method={type} action={'/categories'} onSubmit={()=>setVisibleModal(false)}>
                <label htmlFor="title">
                    <small>Category title</small>
                    <input type="text" name={"title"} placeholder={"Title..."} className={"input w-full"}/>
                    <input type={"hidden"} name={"id"} value={id}/>
                </label>

                <div className={"flex items-center gap-2"}>
                    <button className={"btn btn-green"} type={"submit"}>
                        {type === "patch" ? "Save" : "Create"}
                    </button>
                    <button className={"btn btn-red"} onClick={()=>setVisibleModal(false)}>Closed</button>
                </div>
            </Form>
        </div>
    );
};

export default CategoryModal;
