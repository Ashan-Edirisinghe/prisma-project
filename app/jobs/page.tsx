"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/jobs.module.css";

type Job = {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  description: string;
};

export default function SearchJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Failed to load jobs:", error);
        setJobs([]);
      }
    }
    loadJobs();
  }, []);

  return (
    <div className={styles["jobs-container"]}>
      <div className={styles["jobs-header"]}>
        <h1>Available Jobs</h1>
      </div>

      {jobs.length === 0 ? (
        <div className={styles["no-results"]}>
          No jobs available at the moment.
        </div>
      ) : (
        <div className={styles["jobs-list"]}>
          {jobs.map(job => (
            <div key={job.id} className={styles["job-card"]}>
              <h2 className={styles["job-title"]}>{job.title}</h2>
              <p className={styles["job-company"]}>{job.company}</p>

              <div className={styles["job-details"]}>
                <span className={`${styles["job-badge"]} ${styles["badge-type"]}`}>
                  {job.type === "full"
                    ? "Full Time"
                    : job.type === "part"
                    ? "Part Time"
                    : "Internship"}
                </span>

                <span className={`${styles["job-badge"]} ${styles["badge-location"]}`}>
                  {job.location}
                </span>
              </div>

              <p className={styles["job-description"]}>
                {job.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
