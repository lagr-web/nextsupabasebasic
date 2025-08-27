//src/conponents/ConfirmDelete.tsx

"use client";

import React, { useState } from 'react';

type Props = {

  modal: boolean;
  close: () => void;
  id: number; // eller id: number | undefined
  refresh: () => void; // <-- ny prop
}

const ConFirmDelete = ({ modal, close, id, refresh }: Props) => {

  console.log(id);

  if (!modal) return false;

  const [deleted, setDeleted] = useState<boolean>(false);


  const isDeleted = () => {

    console.log('jeg sletter');

    setDeleted(true);

    setTimeout(() => {

      refresh();//kalder vores refreh funktion i dashboard

    }, 2000)

  }


  const deletePost = async () => {

    try {

      const res = await fetch(`http://localhost:3000/api/supa/delete/${id}`,
        {
          method: 'DELETE'
        }

      )

      if (res.ok) {
        console.log("ok")
        isDeleted(); // Callback for UI-opdatering

      } else {
        console.log("not ok")
      }

    } catch (error) {

      console.log(error)

    }


  }


  return (
    <>
      <section className="absolute grid-rows-4 w-2xs bg-white rounded top-7 left-1/2 -translate-x-1/2 text-sm p-4 shadow-2xl" role="dialog" aria-modal="true">

        <p className="mb-10">Vil du slette denne post</p>

        <div className="flex justify-end grid-cols-2 pb-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mx-6 rounded cursor-pointer" value="cancel" onClick={close}>Annuller</button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer" value="confirm" onClick={deletePost}>Slet</button>
        </div>

        <div className={deleted ? "block text-gray-600" : "hidden"} role="status">
          Din post blev slettet
        </div>

      </section>
    </>
  )
}

export default ConFirmDelete;