import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import GreenButton from '@/Components/GreenButton';
;

export default function ApproveJobButton({ className = '', job }) {
  const [confirmingJobListingApprove, setConfirmingJobListingApprove] = useState(false);

  const {
    post,
    processing,
  } = useForm();

  const confirmUserDeletion = () => {
    setConfirmingJobListingApprove(true);
  };

  const approveJobListing = (e) => {
    e.preventDefault();

    post(route('admin.approve.job', { id: job.id }), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setConfirmingJobListingApprove(false);
  };

  return (
    <section className={ `space-y-6 ${className}` }>
      <GreenButton onClick={ confirmUserDeletion }>Approve</GreenButton>

      <Modal show={ confirmingJobListingApprove } onClose={ closeModal }>
        <form onSubmit={ approveJobListing } className="p-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Are you sure you want to Approve this Job Listing?
          </h2>

          <p className="mt-1 text-lg text-gray-600">
            Once approved, this job listing will be available for everyone to see and will start accepting applicants.
          </p>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

            <GreenButton className="ms-3" disabled={ processing } onClick={ approveJobListing }>
              Approve Job Listing
            </GreenButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}

