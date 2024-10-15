import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import JobDetails from '../Company/Jobs/JobDetails';

export default function JobBoards({ auth, all_jobs }) {
  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Job Boards</h2> }
    >
      <Head title="Job Boards" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          { all_jobs.data && all_jobs.data.length ?
            all_jobs.data.map((job) => (
              <Link key={ job.id } href={ route('admin.view.job', { jobListing: job }) }>
                <div className=" bg-white shadow sm:rounded-lg mb-5">
                  <JobDetails
                    job={ job }
                    trim={ true }
                    trimCount={ 55 }
                  />
                </div>
              </Link>
            ))
            : <p>No Jobs yet..</p>
          }

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
