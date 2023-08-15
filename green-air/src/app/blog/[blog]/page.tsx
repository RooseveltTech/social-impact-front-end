
import Link from 'next/link'
// import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";


import {
    LoginButton,
    ProfileButton,
  } from "../../../components/buttons.component";

type Blog = {
    id: number;
    blog_title: string;
    first_name: string;
    last_name: string;
    blog_body: string;
    created_at : string;
    image: string;
    count: number;
}




export default async function Blog({
    params,
  }: {
    params: { blog: string };
  }) {
    
    const blog_id = params.blog[0];


    const single_blog = await fetch(
        process.env.BASE_URL + `/air/v1/single_blog/?blog_id=${blog_id}`,{
                "headers": {
                    "content-type": 'application/json',
                },
                cache: 'no-store',
        }
      );
      const blog: Blog = await single_blog.json()
     
    //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <>

    {single_blog.status === 200 ? (
        
            <article id="accordion-collapse" data-accordion="collapse" className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                    <address className="flex items-center mb-6 not-italic">
                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                            {/* <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos"/> */}
                            <div className="mr-4 w-16 h-16 rounded-full inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span className="font-medium text-gray-600 dark:text-gray-300">{blog.first_name.substring(0,1)}{blog.last_name.substring(0,1)}</span>
                            </div>
                            <div>
                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{blog.first_name} {blog.last_name}</a>
                                <p className="text-base font-light text-gray-500 dark:text-gray-400">Admin</p>
                                <p className="text-base font-light text-gray-500 dark:text-gray-400"><time title="February 8th, 2022">{new Date(blog.created_at).toDateString()}</time></p>
                            </div>
                        </div>
                    </address>
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.blog_title}</h1>
                    <figure>
                        <img src={blog.image} alt=""/>
                        {/* <figcaption>Digital art by Anonymous</figcaption> */}
                    </figure>
                </header>
                        <p>
                            {blog.blog_body}
                        
                         </p>
                <br></br>
                {blog.count==0 ? 
                <button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                </svg>
                <span className="sr-only">Icon description</span>
                <span className="ml-2">Like </span>
              </button>: (
                <button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                    </svg>
                    <span className="sr-only">Icon description</span>
                    <span className="ml-2">Like {blog.count} </span>
                </button>
            
            )}
                
            </article>
       

     ) : 
    ( single_blog.status === 404 ? redirect("/blogs"): redirect("/api/auth/signin"))
    }
    </>
    </div>
    </main>
)
}

