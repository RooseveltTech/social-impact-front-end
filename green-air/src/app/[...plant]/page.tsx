import Link from 'next/link'
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect} from "next/navigation";
import { BackButton } from '../../components/buttons.component';
import { headers } from "next/headers";

type Plant = {
    
    id: number;
    name: string;
    botanical_name: string;
    type_by_size: string;
    type_by_life_cycle: string;
    plant_care: string; 
    toxicity: string;
    toxicity_level: string; 
    plan_removes_toxins: string;
    description: string;
    image: string;
}



export default async function Home({
    params,
  }: {
    params: { plant: string };
  }) {
    const session = await getServerSession(options)
    if (!session) {
        redirect("/api/auth/signin");
    }
    else if (!params){
        redirect("/home");
    }
    //@ts-ignore
    const token  = session.access

    const ip = headers().get("x-forwarded-for");
    await fetch(
        process.env.BASE_URL + `/air/v1/get_ip_address/?ip_address=${ip}`, {
        "headers": {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        cache: 'no-store',
    }
    );
    
    const plant_id = params.plant[1];
    const get_air_quality = await fetch(
        process.env.BASE_URL + `/air/v1/air-plants/?plant_id=${plant_id}`,{
                "headers": {
                    "content-type": 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                cache: 'no-store',
        }
      );
      const plant: Plant = await get_air_quality.json()
      
      return (
        <>
        {get_air_quality.status === 200 ? (
      
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    
                </div> 
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                        <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Plant</span>
                        
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                        <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{plant.name}</span>
                        </div>
                    </li>
                    </ol>
                </nav>
                <br/>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{plant.name}</h1>
               
                <figure><img src={plant.image} alt={plant.botanical_name}/>
                    <figcaption>Botanical name: {plant.botanical_name}</figcaption>
                </figure>
                </div> 
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Getting started with {plant.name}</h2>
                    <p>{plant.description}</p>
                </div>
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Size: {plant.type_by_size}, Lifecycle: {plant.type_by_life_cycle}</h2>
                    </div>
                <div>
                    {plant.toxicity_level=="LOW" ? 
                        <h2 className="mb-4 text-xl font-semibold text-green-900 lg:mb-6 lg:text-4xl dark:text-white">Toxic Level: {plant.toxicity_level}</h2> 
                        :(plant.toxicity_level=="MEDIUM"?(
                            <h2 className="mb-4 text-xl font-semibold text-blue-900 lg:mb-6 lg:text-4xl dark:text-white">Toxic Level: {plant.toxicity_level}</h2>
                        ):(
                            <h2 className="mb-4 text-xl font-semibold text-red-900 lg:mb-6 lg:text-4xl dark:text-white">Toxic Level: {plant.toxicity_level}</h2>
                        ))}
                            
                </div>
                {plant.toxicity ? (
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Toxicity</h2>
                        <p>{plant.toxicity}</p>
                    </div>
                ):("")}
                
                {plant.plant_care ? (
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Plant Care</h2>
                        <p>{plant.plant_care}</p>
                    </div>
                ):("")}
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Toxins removed</h2>
                    <p>{plant.plan_removes_toxins}</p>
                </div>
            </div>
        </section>
        
      
        ): (get_air_quality.status === 404 ? redirect("/home") : redirect("/api/auth/signin"))}
        </>
      )
  
}