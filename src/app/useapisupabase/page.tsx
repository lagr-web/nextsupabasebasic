import Link from "next/link";
import { getData } from "./data";

const page = async () => {

    const names = await getData();

    return (

        <>

            {names &&

                names.data.map((item: any) => (

                    
                        <div key={item.id}>


                           <Link 
                           
                             href={{

                                pathname:'/useapisupabasequery',
                                query:{id:item.id}

                             }}
                           
                           >

                             {item.name}

                           </Link>


                        </div>
                    


                ))

            }

        </>

    )
}

export default page;