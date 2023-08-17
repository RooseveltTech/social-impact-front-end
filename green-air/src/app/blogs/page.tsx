
import Link from 'next/link'
import parse from 'html-react-parser';

type Blogs = {
    data: Blog[];
    total_page: number;
    page_count: number;
    total_data_count: number;
};
type Blog = {
    id: number;
    blog_title: string;
    first_name: string;
    last_name: string;
    image: string;
    blog_body: string;
    created_at: string;
}


export default async function Blogs() {
    const blogs = await fetch(
        'http://backendgreenair.azurewebsites.net/air/v1/blog/', {
        "headers": {
            "content-type": 'application/json',
        },
        cache: 'no-store'
    },
    );

    if(blogs.ok===false){
        return (
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                    NOT FOUND
                </div>
            </main>
        )
    }
    const blog: Blogs = await blogs.json();

    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block">

            <>
                {blogs.status === 200 ? 
                    <div className="justify-between px-4 mx-auto max-w-screen-xl">

                        {blog.data.map((article, index) => (

                            <article key={index} className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert blog-page">
                                <header className="mb-4 lg:mb-6 not-format">
                                    <address className="flex items-center mb-6 not-italic">
                                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                            <div className="mr-4 w-16 h-16 rounded-full inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">{article.first_name.substring(0, 1)}{article.last_name.substring(0, 1)}</span>
                                            </div>
                                            <div>
                                                <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{article.first_name} {article.last_name}</a>
                                                <p className="text-base font-light text-gray-500 dark:text-gray-400">Admin</p>
                                                <p className="text-base font-light text-gray-500 dark:text-gray-400"><time title="">{new Date(article.created_at).toDateString()}</time></p>
                                            </div>
                                        </div>
                                    </address>
                                    <h1 className="mb-4 text-xl font-extrabold text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">{article.blog_title}</h1>
                                    <figure>
                                        <img src={article.image} alt="" />
                                    </figure>
                                </header>

                                {
                                    article.blog_body.length > 400 ?
                                        <div>
                                            {parse(article.blog_body.substring(0, 400) + '.....' || '')}
                                           
                                            <Link href={{
                                                pathname: `/blog/${article.id}`,
                                            }} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                                Read more
                                                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                        </div>

                                        :
        
                                            <div>
                                                {parse(article.blog_body || '')}
                                            </div>
                                        }

                            </article>
                        ))}
                    </div>
                 :
                    <div>
                        
                    </div>}
            </>

        </main>
    )
}

