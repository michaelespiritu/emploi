import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import JobDetails from './JobDetails';

export default function Show({ auth, job }) {
  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <div className="flex items-center gap-2">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">{ job.title }</h2>
        <FontAwesomeIcon icon={ faPenToSquare } />
      </div> }
    >
      <Head title={ job.title } />

      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <JobDetails job={ job } />
        </div>
      </div>
    </AuthenticatedLayout >
  )
}
