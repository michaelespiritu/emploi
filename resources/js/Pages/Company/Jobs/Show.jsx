import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import JobDetails from './JobDetails';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Delete from './Delete';

export default function Show({ auth, job, status }) {
  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <div className="">

        <div className='flex justify-between'>
          <div>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">{ job.title }</h2>
          </div>
          <div className='flex gap-3'>
            <Link
              href={ route('job.edit', { id: job.id }) }
            >
              <PrimaryButton>Edit <FontAwesomeIcon icon={ faPenToSquare } className='ml-1' /></PrimaryButton>
            </Link>
            <Delete
              job={ job }
            />
          </div>
        </div>
      </div> }
    >
      <Head title={ job.title } />

      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          { status }
          <JobDetails job={ job } />
        </div>
      </div>
    </AuthenticatedLayout >
  )
}
