import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Delete({ className = '', job }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteJobListing = (e) => {
    e.preventDefault();

    destroy(route('job.destroy', { id: job.id }), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <section className={ `space-y-6 ${className}` }>
      <DangerButton onClick={ confirmUserDeletion }>Delete <FontAwesomeIcon icon={ faTrash } className='ml-1' /></DangerButton>

      <Modal show={ confirmingUserDeletion } onClose={ closeModal }>
        <form onSubmit={ deleteJobListing } className="p-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Are you sure you want to delete this Job Listing?
          </h2>

          <p className="mt-1 text-lg text-gray-600">
            Once this job listing <strong>{ job.title }</strong> is deleted, all of its resources and data will be permanently deleted and cannot be undo.
          </p>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={ processing } onClick={ deleteJobListing }>
              Delete Job Listing
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}

