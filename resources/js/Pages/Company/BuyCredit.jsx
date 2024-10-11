import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function BuyCredit({ auth, status }) {

  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">All Jobs</h2> }
    >
      <Head title="All Jobs" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          { status }
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

