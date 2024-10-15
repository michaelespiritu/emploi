import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
;

export default function DeclineJobButton({ className = '', job }) {
  const [confirmingJobListingDecline, setConfirmingJobListingDecline] = useState(false);

  const {
    data,
    setData,
    post,
    processing,
    reset,
    errors,
  } = useForm({
    reasonForDecline: '',
  });


  const confirmUserDeletion = () => {
    setConfirmingJobListingDecline(true);
  };

  const deleteJobListing = (e) => {
    e.preventDefault();

    post(route('admin.decline.job', { id: job.id }), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingJobListingDecline(false);

    reset();
  };

  return (
    <section className={ `space-y-6 ${className}` }>
      <DangerButton onClick={ confirmUserDeletion }>Decline</DangerButton>

      <Modal show={ confirmingJobListingDecline } onClose={ closeModal }>
        <form onSubmit={ deleteJobListing } className="p-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Are you sure you want to Decline this Job Listing?
          </h2>

          <p className="mt-1 text-lg text-gray-600">
            Once decline Job Token will be credited back to the user and they will received a notification stating the reason.
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="password" value="Reason for Decline" className="sr-only" />

            <Textarea
              id="reasonForDecline"
              type="reasonForDecline"
              name="reasonForDecline"
              value={ data.reasonForDecline }
              onChange={ (e) => setData('reasonForDecline', e.target.value) }
              className="mt-1 block w-full"
              isFocused
              placeholder="Reason for Decline"
            />

            <InputError message={ errors.reasonForDecline } className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={ processing } onClick={ deleteJobListing }>
              Decline Job Listing
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}

