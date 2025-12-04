"use client";
import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import { useSession, signOut } from 'next-auth/react';
 

export default function Navbar() {

 const { data: session, status } = useSession();
  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        <div className={styles['navbar-logo']}>
          <Link href="/">
           Hire Me
          </Link>
        </div>
        <ul className={styles['navbar-menu']}>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
           
          { session ? ( 
            <> 
          <li>
            <Link href="/jobs/post">
              Jobs
            </Link>
          </li>
          <li>
            <Link href="/search">
              Search
            </Link>
          </li>
          <li>
            <Link href="/profile">
              Profile
            </Link>
          </li>
           <li>
            <Link href="" onClick={() => signOut({ callbackUrl: '/auth' })}>
              Sign Out
            </Link>
          </li>
          </>
           //end of logged in view

          ) :<> <li>
            <Link href="/users">
              Users
            </Link>
          </li>
          <li>
            <Link href="/about">
              About
            </Link>
          </li> 
          
          <li>
            <Link href="/auth"   >
              Sign In
            </Link>
          </li>
          </> }
           
        </ul>
      </div>
    </nav>
  );
}