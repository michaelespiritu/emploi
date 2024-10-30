import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import GreenButton from '@/Components/GreenButton';
import { useEffect, forwardRef } from 'react';

const JobListingBody = forwardRef(({ job }, ref) => {
  const safeHTML = DOMPurify.sanitize(job.description);

  const handleScrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleScrollToTop, 100);
    return () => clearTimeout(timer);
  }, [job]);

  return (
    <div className="bg-white overflow-y-scroll h-full shadow-sm sm:rounded-lg p-5 absolute w-full" ref={ ref }>
      <div className="mb-4">
        <h1 className="text-gray-900 font-bold text-5xl pb-1">{ job.title }</h1>
        <div className="flex gap-3">
          <p className="text-gray-900 pb-3">{ job.company.name }</p>
          <p>&bull;</p>
          <p className="text-gray-900 pb-3">View all jobs</p>
        </div>
        <div className="flex gap-3 font-thin">
          <p className="text-gray-500 pb-3">
            <FontAwesomeIcon icon={ faMoneyBill1Wave } /> { job.budget }
          </p>
          <p>&bull;</p>
          <p className="text-gray-500 pb-3">
            <FontAwesomeIcon icon={ faLocationDot } /> { job.company.address }
          </p>
          <p>&bull;</p>
          <p className="text-gray-500 pb-3">
            <FontAwesomeIcon icon={ faClock } /> { job.type }
          </p>
          <p>&bull;</p>
          <p className="text-gray-500 pb-3">Posted { job.created_at_human }</p>
        </div>
      </div>

      <div className="flex gap-4 mb-5">
        <GreenButton>Quick Apply</GreenButton>
        <SecondaryButton>Save</SecondaryButton>
      </div>

      <div className="text-gray-900 joblisting-body">
        <span dangerouslySetInnerHTML={ { __html: safeHTML } } />
      </div>
    </div>
  );
});

export default JobListingBody;
