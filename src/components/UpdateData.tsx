//src/components/UpdateData.tsx

import React, { useState } from 'react'
import TextFields from './TextFields';
import Button from './Button';

type Props = {

    modal: boolean;
    close: () => void;
    id: number; // eller id: number | undefined
    refresh: () => void; // <-- ny prop
}


const UpdateData = ({ modal, close, id, refresh }: Props) => {


    if (!modal) return false;

    const [updated, setUpdated] = useState<boolean>(false);


    const isUpdated = () => {

        console.log('jeg updatere');

        setUpdated(true);

        setTimeout(() => {

            refresh();//kalder vores refreh funktion i dashboard

        }, 2000)

    }


    return (

        <section className="absolute grid-rows-4 w-2xs bg-white rounded top-7 left-1/2 -translate-x-1/2 text-sm p-4 shadow-2xl" role="dialog" aria-modal="true">


            <form>

                <TextFields
                    label="Name"
                /*    {...register("firstName")} */
                />
                <span className="text-gray-400 text-sm">
                    {/*   {errors.firstName?.message} */}
                </span>

                <TextFields
                    label="Lastname"
                /*    {...register("firstName")} */
                />
                <span className="text-gray-400 text-sm">
                    {/*   {errors.firstName?.message} */}
                </span>

                <Button />

            </form>




        </section>
    )



}

export default UpdateData