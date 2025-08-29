//src/components/UpdateData.tsx
import React, { FormEvent, useEffect, useState } from 'react'
import TextFields from './TextFields';
import Button from './Button';
import { getQueryData } from '@/services/data';

type Props = {

    modal: boolean;
    close: () => void;
    id: number; // eller id: number | undefined
    refresh: () => void; // <-- ny prop
}


const UpdateData = ({ modal, close, id, refresh }: Props) => {

    const [name, setName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [updated, setUpdated] = useState<boolean>(false);

    useEffect(() => {

        (async () => {

            const queryData = await getQueryData(id);

            if (queryData) {

                setName(queryData?.data[0]?.name);
                setLastName(queryData?.data[0]?.lastname);
            }

        })();

    }, [updated]);


    if (!modal) return false;

    


    const isUpdated = () => {

        console.log('jeg updatere');

        setUpdated(true);

        setTimeout(() => {

            refresh();//kalder vores refreh funktion i dashboard

        }, 500);

    }


    const updatePost = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const submitData = { name, lastname } //states

        try {
            const res = await fetch(`http://localhost:3000/api/supa/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname }),
                cache: 'no-store',
            });

            if (!res.ok) throw new Error("Opdatering fejlede");

            console.log("ok");
            //setOk("Dine data er opdateret");

        } catch (error) {
            console.error(error);
        } finally {

            isUpdated();
           
            //setName('');
            //setLastName('');
        }

    }


    return (

        <section className="absolute grid-rows-4 w-2xs bg-white rounded top-7 left-1/2 -translate-x-1/2 text-sm p-4 shadow-2xl" role="dialog" aria-modal="true">

            <form onSubmit={updatePost}>

                <TextFields
                    label="Name"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                /*    {...register("firstName")} */
                />
                <span className="text-gray-400 text-sm">
                    {/*   {errors.firstName?.message} */}
                </span>

                <TextFields
                    label="Lastname"
                    name="lastname"
                    value={lastname}
                    onChange={e => setLastName(e.target.value)}
                /*    {...register("firstName")} */
                />
                <span className="text-gray-400 text-sm">
                    {/*   {errors.firstName?.message} */}
                </span>

                <Button />

                <div className={updated ? "block text-gray-600" : "hidden"} role="status">
                    Din post er opdateret
                </div>

            </form>




        </section>
    )



}

export default UpdateData