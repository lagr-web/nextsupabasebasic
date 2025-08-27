//src/app/admin/dashboard/page.tsx
"use client";

import React, { Fragment, useEffect, useState } from 'react'
import { getAllData } from './data';
import ConFirmDelete from '@/components/ConFirmDelete';
import UpdateData from '@/components/UpdateData';

type ModalMode = "delete" | "update" | null;

const page = () => {

    const [mData, setMData] = useState<any | null>(null);
    //const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
   // const [iUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
    const [mId, setMId] = useState<number>(0);
    const [openModal, setOpenModal] = useState<ModalMode>(null);


    const handleOpenModal = (id: number, mode: "delete" | "update") => {
        setMId(id);
        setOpenModal(mode);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
        setMId(0);
    };

    const fetchData = async () => {
        // Hent data fra backend og opdater state
        const allData = await getAllData();

        setMData(allData);
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>

            <div className="flex justify-center">
                <section className="grid grid-cols-[300px_150px_150px] gap-0.5 text-white text-sm">
                    {mData &&
                        mData.data.map((items: any) => (
                            <Fragment key={items.id}>
                                <div className="bg-gray-500 p-2.5">{items.name} {items.lastname}</div>
                                <div className="bg-gray-800 p-2.5 hover:bg-gray-400 cursor-pointer" onClick={() => { handleOpenModal(items.id, "update") }} >Opdater</div>
                                <div className="bg-gray-800 p-2.5 hover:bg-gray-400 cursor-pointer" onClick={() => { handleOpenModal(items.id, "delete") }} >Slet</div>
                            </Fragment>
                        ))
                    }
                </section>
            </div>

            {openModal === "delete" && (
                <ConFirmDelete modal={true} close={handleCloseModal} id={mId} refresh={fetchData} />
            )}

            {openModal === "update" && (
                <UpdateData modal={true} close={handleCloseModal} id={mId} refresh={fetchData} />
            )}
        </>


    )
}

export default page