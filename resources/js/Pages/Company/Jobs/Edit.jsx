import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function Edit({ auth, job, categories }) {

  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <div className="flex items-center gap-2">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">{ job.title }</h2>

        <Link
          href={ route('job.edit', { id: job.id }) }
        >
          <FontAwesomeIcon icon={ faPenToSquare } />
        </Link>
      </div> }
    >
      <Head title={ job.title } />

      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <Form
            buttonText={ 'Update' }
            categories={ categories.data }
            values={ job }
            route={ route('job.update', { id: job.id }) }
            type={ 'patch' }
          />
        </div>
      </div>
    </AuthenticatedLayout >
  )
}
