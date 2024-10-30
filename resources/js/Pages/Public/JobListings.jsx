import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import JobListingBody from './JobListingBody';
import { useRef, useState } from 'react';
import JobDetails from './JobDetails';

export default function JobListings({ status, categories, all_jobs }) {
  const [selectedJob, setSelectedJob] = useState();

  const jobRef = useRef(null);

  const handleSelectedJob = (job) => {
    setSelectedJob(job)
  }
  return (
    <GuestLayout
      classStyle="w-full flex justify-center items-center h-screen"
    >
      <Head title="Job Listings" />

      <div className='w-4/5 m-10 flex flex-nowrap gap-11'>
        <div className="flex-2">
          { all_jobs && all_jobs.length > 0 ?
            all_jobs.map((job) => (
              <div
                key={ job.id }
                className="bg-white shadow sm:rounded-lg mb-5"
                onClick={ () => handleSelectedJob(job) }
              >
                <JobDetails job={ job } trim={ true } />
              </div>
            ))
            :
            <p>No Job Listing yet..</p>
          }
        </div>
        <div className="flex-1 relative"   >
          { selectedJob && <JobListingBody job={ selectedJob } /> }
        </div>
      </div>

    </GuestLayout>
  );
}
