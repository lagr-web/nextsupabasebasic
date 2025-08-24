import { getQueryData } from "./data";

type PageProps = {

    searchParams: Promise<{ id: string }>
}

const Page = async (props: PageProps) => {

    const { id } = await props.searchParams;

    const queryData = await getQueryData(id);

    return (


        <>

            {queryData &&

                <div>
                    {queryData.data[0].lastname}
                </div>

            }

        </>

    )
}

export default Page;