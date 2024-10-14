import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobDetails from './JobDetails';
import Form from './Form';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, status, all_jobs, categories }) {
  const [showForm, setShowForm] = useState((all_jobs && all_jobs.length > 0) ? true : false)

  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">All Jobs</h2> }
    >
      <Head title="All Jobs" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

          <div className='flex justify-between items-center'>
            <p className="mb-5 text-xl" >{ status }</p>

            <PrimaryButton className="mb-5" onClick={ () => setShowForm(!showForm) }>
              { (showForm) ? 'Create Job' : 'Cancel' }
            </PrimaryButton>
          </div>



          { all_jobs && all_jobs.length > 0 && showForm ?
            all_jobs.map((job) => (
              <Link key={ job.id } href={ route('job.show', { jobListing: job }) }>
                <div className=" bg-white shadow sm:rounded-lg mb-5">
                  <JobDetails job={ job } trim={ true } />
                </div>
              </Link>
            ))
            : <Form
              categories={ categories.data }
              route={ route('job.store') }
              type={ 'post' }
            />
          }
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
