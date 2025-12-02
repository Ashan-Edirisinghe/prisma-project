import { signIn } from '@/auth';
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
                    <form
                        action={async () => {
                            'use server';
                            await signIn('google', { redirectTo: '/' });
                        }}
                    >
                        <button type="submit">Sign In with Google</button>
                    </form>
                </div>
            </div>
        </div>
    );
}