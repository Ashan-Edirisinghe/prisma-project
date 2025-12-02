import styles from '@/styles/signin.module.css';

export default function SignInPage() {
    return (
        <div className={styles['signin-container']}>
            <div className={styles['signin-card']}>
                <div className={styles['signin-header']}> 
                    <h1>Sign In</h1>
                    <p>Please enter your credentials to sign in.</p>
                </div>

                <div className={styles['signin-buttons']}>
                    <button>Sign In with Google</button>
                </div>
            </div>
        </div>
    );
}