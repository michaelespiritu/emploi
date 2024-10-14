import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function BuyCredit({ auth, status, job = null }) {

  const { data, setData, post, processing, errors } = useForm({
    token: 5,
    job: job ? job.id : '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('company.post.buy.token'));
  };

  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase Job Listing Token</h2> }
    >
      <Head title="Buy Job Listing Token" />
      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-5'>
            <div className="text-base">{ status }</div>

            <div className='mt-4'>
              <form onSubmit={ submit }>
                <input
                  type="hidden"
                  value={ data.job }
                />

                <div>
                  <InputLabel htmlFor="token" value="Token" />

                  <TextInput
                    id="token"
                    name="token"
                    type="number"
                    value={ data.token }
                    className="mt-1 block w-full"
                    autoComplete="token"
                    isFocused={ true }
                    onChange={ (e) => setData('token', e.target.value) }
                    required
                  />

                  <InputError message={ errors.token } className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                  <PrimaryButton className="ms-4" disabled={ processing }>
                    Purchase
                  </PrimaryButton>
                </div>

              </form>
            </div>


          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

