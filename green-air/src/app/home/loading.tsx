//   export default function Loading() {
//     return  <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block">
//                 <div className="justify-between px-4 mx-auto max-w-screen-xl">
//                 <div className="text-center">
//                 <div role="status">
//                     <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//                         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//                     </svg>
//                     <span className="sr-only">Loading...</span>
//                 </div>
//                 </div>
//                 </div>
//             </main>
//             ;
//   }

// export default function Loading() {
//     return (
//       <div className="products-grid">
//         {
//           [...new Array(10)].map((p, index) => (
//             <article key={index} className="skeleton-card">
//               <div className="skeleton skeleton-card-img">
//               </div>
//               <div className="skeleton-card-text">
//                 <h2 className="skeleton skeleton-card-title"></h2>
//                 <h4 className="skeleton skeleton-card-brand"></h4>
//                 <p className="skeleton skeleton-card-description"></p>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px 0" }}>
//                   <p className="skeleton skeleton-card-price"></p>
//                   <p className="skeleton skeleton-card-rating"></p>
//                 </div>
//               </div>
//             </article>
//           ))
//         }
//       </div>
//     )
//   }

  export default function Loading(){
    return (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 main-block" >
    
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            
                        <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-white-700 rounded-lg border-2 border-gray-200">
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-gray-700 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"></div>
                        </button> 
                   
                    <h3 className="skeleton skeleton-card-brand"></h3>
                    <h3 className="skeleton skeleton-card-brand"></h3>
                    <h3 className="skeleton skeleton-card-brand"></h3>
                </div> 
                
                <div className="grid gap-8 lg:grid-cols-3">
                    {
                    [...new Array(15)].map((p, index) => (
                        <article key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                  
                                </span>
                                <span className="text-sm"></span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white skeleton skeleton-card-brand"></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400 skeleton skeleton-card-brand" ></p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 rounded-full" src="" alt="" />
                                    <span className="font-light dark:text-white skeleton skeleton-card-brand">
                                    </span>
                                </div>
                                <a href=""
                                    className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article>  
                    )) }      
                </div> 
            </div>
        </main>
    )
  }