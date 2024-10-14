import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import JobDetails from './JobDetails';
import Form from './Form';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth, status, categories }) {

  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">All Jobs</h2> }
    >
      <Head title="All Jobs" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

          <Form
            categories={ categories.data }
            route={ route('job.create') }
            type={ 'post' }
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
