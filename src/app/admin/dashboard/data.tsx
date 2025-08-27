//src/app/admin/dashboard/data.ts

export const getAllData = async () => {

    const res = await fetch('http://localhost:3000/api/supa');

    if(!res.ok) throw new Error('failed');
    
    return res.json();

}