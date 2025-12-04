'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/postjob.module.css';

export default function PostJob() {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formdata = new FormData(e.target as HTMLFormElement);
        const data = {
            title: formdata.get('title') as string,
            type: formdata.get('type') as string,
            company: formdata.get('company') as string,
            description: formdata.get('description') as string,
            location: formdata.get('location') as string,
        }

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Job posted successfully!');
                router.push('/profile');
            } else {
                alert(result.error || 'Failed to post job');
            }
        } catch (error) {
            console.error("Error creating job:", error);
            alert('An error occurred while posting the job');
        }
    }
    return (
        <div className={styles['post-container']}>
            <h1 className={styles['post-title']}>Post a Job</h1>
            
            <form onSubmit={handleSubmit} className={styles['post-form']}>
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        Job Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                         
                        required
                        placeholder="e.g. Senior Software Engineer"
                        className={styles['form-input']}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        Job Type *
                    </label>
                    <select
                        name="type"
                         
                        required
                        className={styles['form-select']}
                    >
                        <option value="full">Full Time</option>
                        <option value="part">Part Time</option>
                        <option value="intern">Internship</option>
                    </select>
                </div>

                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        Company *
                    </label>
                    <input
                        type="text"
                        name="company"
                         
                        required
                        placeholder="e.g. Google Inc."
                        className={styles['form-input']}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        Description *
                    </label>
                    <textarea
                        name="description"
                         
                        required
                        placeholder="Job description, requirements, responsibilities..."
                        rows={6}
                        className={styles['form-textarea']}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>
                        Location *
                    </label>
                    <input
                        type="text"
                        name="location"
                       
                        required
                        placeholder="e.g. Remote, New York, USA"
                        className={styles['form-input']}
                    />
                </div>

                <div className={styles['button-group']}>
                    <button type="submit" className={styles['btn-submit']}>
                        Post Job
                    </button>
                    <button type="button"  >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}