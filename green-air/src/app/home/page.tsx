
import Link from 'next/link'
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";


import {
    LoginButton,
    ProfileButton,
    RegisterButton,
  } from "../../components/buttons.component";

type Aqi = {
    aqi: number;
    idx: number;
    city: string;
    aqi_status: string;
    aqi_color: string;
    aqi_message: string;
    all_plants: Plant[];
};
type Plant = {
    id: number;
    name: string;
    botanical_name: string;
    toxicity_level: string;
    plan_removes_toxins: string;
    image: string;
    plant_care: string;
    created_at : string;
}


export default async function Home() {
    const session = await getServerSession(options)
    if (!session) {
        redirect("/api/auth/signin");
    }
    //@ts-ignore
    const token  = session.access
    // console.log(token, "THIS IS TOKEN")

    const get_air_quality = await fetch(
        'https://backendgreenair.azurewebsites.net/air/v1/air-quality/',{
                "headers": {
                    "content-type": 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
        }
      );
      const aqi: Aqi = await get_air_quality.json()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block" >
        <>
        {get_air_quality.status === 200 ? (

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    {
                        aqi.aqi_color == "bg-success" ? 
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-green-500">
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{aqi.aqi}</div>
                        </button> : (
                        aqi.aqi_color == "bg-warning" ?  
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-yellow-500">
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="yellow" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-yellow-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{aqi.aqi}</div>
                        </button> : (
                        aqi.aqi_color == "bg-orange" ? 
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-orange-500">
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="orange" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <span className="sr-only">Notifications</span>
                        <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{aqi.aqi}</div>
                        </button> : (
                        aqi.aqi_color == "bg-danger" ?
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-red-500">
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{aqi.aqi}</div>
                        </button>: (
                        aqi.aqi_color == "bg-purple" ? 
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-purple-500">
                             <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                 <path stroke="purple" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                             </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-purple-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{aqi.aqi}</div>
                        </button>
                         : (
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-pink-700">
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="pink" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                           <span className="sr-only">Notifications</span>
                           <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-pink-700 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{aqi.aqi}</div>
                       </button>

                        )
                        )
                        )
                        )
                    )
                    }
                    <h3>{aqi.idx}</h3>
                    <h3>{aqi.city}</h3>
                    {/* <h3>{aqi.aqi_status}</h3>
                    <h3>{aqi.aqi_color}</h3> */}
                    <h3>{aqi.aqi_message}</h3>
                </div> 
                <div className="grid gap-8 lg:grid-cols-3">
                    {aqi.all_plants.map((plant) => (
                        // {plant.toxicity_level == "LOW"? (): ()}
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    {plant.toxicity_level}
                                </span>
                                <span className="text-sm">{plant.botanical_name}</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{plant.name}</h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{plant.plant_care}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 rounded-full" src={plant.image} alt="Jese Leos avatar" />
                                    <span className="font-light dark:text-white">
                                        { months[new Date(plant.created_at).getMonth()]+"/"+ new Date(plant.created_at).getFullYear()}
                                    </span>
                                </div>
                                <Link href={{
                                    pathname: `/plant/${plant.id}`,
                                    }} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </article>  
                    ))}                
                </div> 
            </div>
       ): (redirect("/api/auth/signin"))}
        </>
        </main>
      )
  
}
