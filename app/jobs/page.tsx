'use client';
import { useState, useEffect } from 'react';
import styles from '@/styles/jobs.module.css';

interface Job {
  id: string;
  title: string;
  type: string;
  company: string;
  description: string;
  location: string;
}

export default function SearchJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
        setDisplayedJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === 'all' || job.type === typeFilter;

      const matchesLocation =
        locationFilter === '' ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesType && matchesLocation;
    });
    setDisplayedJobs(filtered);
  };

   
  return (
    <div className={styles['jobs-container']}>
      <div className={styles['jobs-header']}>
        <h1>Search Jobs</h1>
      </div>

      <div className={styles['search-section']}>
        <div className={styles['search-wrapper']}>
          <input
            type="text"
            placeholder="Search by title, company, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles['search-box']}
          />
          <button onClick={handleSearch} className={styles['search-button']}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.filters}>
          <div className={styles['filter-group']}>
            <label className={styles['filter-label']}>Job Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={styles['filter-select']}
            >
              <option value="all">All Types</option>
              <option value="full">Full Time</option>
              <option value="part">Part Time</option>
              <option value="intern">Internship</option>
            </select>
          </div>

          <div className={styles['filter-group']}>
            <label className={styles['filter-label']}>Location</label>
            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={styles['filter-select']}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles['no-results']}>
          <div className={styles['loading-spinner']}></div>
          <p>Loading jobs...</p>
        </div>
      ) : displayedJobs.length === 0 ? (
        <div className={styles['no-results']}>
          No jobs found. Try adjusting your filters.
        </div>
      ) : (
        <div className={styles['jobs-list']}>
          {displayedJobs.map((job) => (
            <div key={job.id} className={styles['job-card']}>
              <h2 className={styles['job-title']}>{job.title}</h2>
              <p className={styles['job-company']}>{job.company}</p>
              <div className={styles['job-details']}>
                <span className={`${styles['job-badge']} ${styles['badge-type']}`}>
                  {job.type === 'full' ? 'Full Time' : job.type === 'part' ? 'Part Time' : 'Internship'}
                </span>
                <span className={`${styles['job-badge']} ${styles['badge-location']}`}>
                  {job.location}
                </span>
              </div>
              <p className={styles['job-description']}>{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}