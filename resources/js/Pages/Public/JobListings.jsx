import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import JobListingBody from './JobListingBody';
import { useRef, useState } from 'react';
import JobDetails from './JobDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import DismissibleInfo from '@/Components/DismissibleInfo';

export default function JobListings({ status, categories, type = 'bg-green-500', all_jobs }) {
  const [selectedJob, setSelectedJob] = useState();

  const jobRef = useRef(null);

  const handleSelectedJob = (job) => {
    setSelectedJob(job)
  }

  return (
    <>
      <GuestLayout>
        <div className='w-full flex justify-center items-center'>
          <Head title="Job Listings" />

          <div className='w-4/5 m-10 flex flex-nowrap gap-11'>
            <div className="flex-2">
              { all_jobs && all_jobs.length > 0 ?
                all_jobs.map((job) => (
                  <div
                    key={ job.id }
                    className={ ` bg-white shadow sm:rounded-lg mb-5 ${(selectedJob == job) ? 'border-blue-900 border-4' : ''}` }
                    onClick={ () => handleSelectedJob(job) }
                  >
                    <JobDetails
                      job={ job }
                      trim={ true }
                    />
                  </div>
                ))
                :
                <p>No Job Listing yet..</p>
              }
            </div>
            <div className="flex-1 relative">
              { selectedJob ?
                <JobListingBody ref={ jobRef } job={ selectedJob } status={ status } type={ type } />
                :
                <div className='bg-white h-full shadow-sm sm:rounded-lg absolute w-full p-16'>
                  <div className='flex items-center gap-5'>
                    <div>
                      <FontAwesomeIcon icon={ faAnglesLeft } />
                    </div>
                    <div>
                      <p className='text-4xl'>Select a job</p>
                      <p className='font-thin text-gray-400'>Display details here</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </GuestLayout>
    </>

  );
}
