"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const Like = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

// export const LogoutButton = () => {

//   return (
//     <button style={{}} onClick={() => signOut()}>
//       Sign Out
//     </button>
//   );
// };

export const SignOutButton = () => {

    return (
      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
      style={{}} onClick={() => signOut()} >
        Sign Out
    </a>
    );
  };

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};

export const BackButton = () => {
    const router = useRouter()
   
    return (
        <button type="button" onClick={() => router.push('/blog')}>
        Back
        </button>
    )
  }

export const RegisterButton = () => {
   
    return (
        <button
            type="submit"
            className="rounded bg-purplish-blue text-white hover:opacity-70"
            >
            Confirm
        </button>
    )
  }

export const PostForumButton = () => {
    const[post,setPost]=useState("")
    return (
        <textarea id="post" 
        rows={6}
        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
        placeholder="Create a Discussion..."
        name="post" 
        value={post} 
        onChange={(e)=>{setPost(e.target.value)}}
        required>
        
    </textarea>
    )
}
