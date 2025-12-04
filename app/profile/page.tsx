'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Profile</h1>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Name:</strong> {session.user?.name || 'N/A'}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Email:</strong> {session.user?.email || 'N/A'}
        </div>
        
        {session.user?.image && (
          <div style={{ marginBottom: '1.5rem' }}>
            <img 
              src={session.user.image} 
              alt="Profile" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                objectFit: 'cover'
              }} 
            />
          </div>
        )}

       
      </div>
    </div>
  );
}
