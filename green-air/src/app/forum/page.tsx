// 'use client';
import Link from 'next/link'
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type AllForum = {
    data: Forum[]
    total_page: number;
    page_count: number;
    total_data_count: number;
}

type Forum = {
    id: number;
    forum_body: string;
    first_name: string;
    last_name: string;
    created_at: string;

}

type AllComment = {
    data: Comment[];
}

type Comment = {
    id: number;
    body: string;
    first_name: string;
    last_name: string;
    created_at: string;
    forum_id: number
}

export default async function Forum() {
    
    const session = await getServerSession(options)
    if (!session) {
        redirect("/api/auth/signin");
    }


    //@ts-ignore
    const token = session.access

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
   
    const active = await fetch(
        process.env.BASE_URL + '/air/v1/check_user/', {
        "headers": {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        cache: 'no-store',
    }
    );
    active.status === 401 ? redirect("/login") : null;


    async function postForum(formData: FormData) {
        'use server'

        
        await fetch(
            process.env.BASE_URL + '/air/v1/forum_post/', {
            method: 'POST',
            "headers": {
                "content-type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            cache: 'no-store',
            body: JSON.stringify({ "post": formData.get('post') })
        }
        );
        redirect("/forum");
    }

    const get_forum_post = await fetch(
        process.env.BASE_URL + '/air/v1/get_forum_post/', {
        "headers": {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        cache: 'no-store',
    }
    );
    const forums: AllForum = await get_forum_post.json()
  

    async function postComment(formData: FormData) {
        'use server'

        
        await fetch(
            process.env.BASE_URL + '/air/v1/forum_comment/', {
            method: 'POST',
            "headers": {
                "content-type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            cache: 'no-store',
            body: JSON.stringify(
                {
                    "comment": formData.get('comment'),
                    "forum_id": formData.get('forum_id')
                }
            )
        }
        );
        
        redirect("/forum");
     
    }

    const get_forum_comment = await fetch(
        process.env.BASE_URL + '/air/v1/get_forum_comment/', {
        "headers": {
            "content-type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        cache: 'no-store',
    }
    );
    const comments: AllComment = await get_forum_comment.json()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block">
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl mx-auto px-4">
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion {forums.total_data_count}</h2>
                        </div>
                        <form action={postForum} id="" className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="post" className="sr-only">Your comment</label>
                                <textarea id="post"
                                    rows={6}
                                    className="px-0 w-full text-base text-gray-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Create a Discussion..."
                                    name="post"
                                    required>

                                </textarea>
                            </div>
                            <button type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Post Discussion
                            </button>
                        </form>


                        {forums.data.map((forum, index) => (
                                
                            <div>
                                <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <svg className="mr-2 w-6 h-6 rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                                {forum.first_name} {forum.last_name}</p>
                                            
                                        </div>
                                      
                                        <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button">
                                              <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                                title="June 23rd, 2022">{new Date(forum.created_at).toDateString()}</time></p>
                                        </button>

                                       
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">{forum.forum_body}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <button type="button" data-modal-target={`authentication-modal${index}`} data-modal-toggle={`authentication-modal${index}`}
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                            <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                            Reply
                                        </button>
                                        <div id={`authentication-modal${index}`} tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div className="relative w-full max-w-md max-h-full">

                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={`authentication-modal${index}`}>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                    <div className="px-6 py-6 lg:px-8">
                                                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Comment for {forum.forum_body}</h3>
                                                        <form action={postComment} className="space-y-6">
                                                            <div>
                                                                {/* <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                                                <input type="hidden" name="forum_id" value={`${forum.id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" hidden />
                                                                <textarea id="comment"
                                                                    rows={6}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                    placeholder="Write a Comment..."
                                                                    name="comment"
                                                                    required>

                                                                </textarea>
                                                            </div>

                                                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comment</button>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                {comments.data.map((comment, index) => (
                                    comment.forum_id === forum.id ?
                                        <article className="comment mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                            <footer className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                        <svg className="mr-2 w-6 h-6 rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                                        {comment.first_name} {comment.last_name}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                                        title="February 12th, 2022"></time></p>
                                                </div>
                                            </footer>
                                            <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>

                                        </article> : null
                                ))}

                            </div>

                        ))}

                    </>
                </div>
            </section>
        </main>


    )
}