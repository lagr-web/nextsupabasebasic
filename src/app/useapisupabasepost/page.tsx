
"use client";

import { useState, FormEvent } from "react";

const page = () => {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const submitData = { name, lastname }

        try {

            const res = await fetch('http://localhost:3000/api/supa/post', {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })

            res.ok ? console.log("ok") : console.log("not ok");

         

        } catch (error) {

              console.log(error);

        }

        console.log(submitData);

           setName('');
            setLastName('');

    } //end handleSubmit


    return (

        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter the name"
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    placeholder="Enter the age"
                    onChange={e => setLastName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </div>
        </form>

    )


}
export default page;