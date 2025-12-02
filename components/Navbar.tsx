import Link from 'next/link';
import styles from '@/styles/navbar.module.css';

export default function Navbar() {
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
          <li>
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
            <Link href="/auth">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}