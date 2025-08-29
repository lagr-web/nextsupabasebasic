//src/services/data.ts

export const getQueryData =  async (id:number | null)=>{

const res = await fetch(`http://localhost:3000/api/supa/${id}`);

 if (!res.ok) throw new Error('failed');

 return res.json();

}