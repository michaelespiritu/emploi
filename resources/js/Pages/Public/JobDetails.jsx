
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';

export default function JobDetails({ job, trim = false, trimCount = 25 }) {
  const getWords = (str, numWords) => {
    const words = str.trim().split(/\s+/);
    const selectedWords = words.slice(0, numWords);
    const result = selectedWords.join(' ');
    return words.length > numWords ? `${result}...` : result;
  }

  const getStatus = () => {
    if (job.status === 'live') {
      return {
        text: 'Live',
        color: 'bg-emerald-500'
      };
    }
    if (job.status === 'reviewing') {
      return {
        text: 'To Review',
        color: 'bg-orange-500'
      };
    }
    if (job.status === 'rejected') {
      return {
        text: 'Rejected',
        color: 'bg-red-500'
      };
    }

    return {
      text: 'Unknown Status',
      color: 'bg-gray-500'
    };
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 ">
      <div className="mb-4">
        <div className="">
          <h1 className="text-gray-900 font-bold text-2xl pb-1">{ job.title }</h1>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-900 pb-3">{ job.company.name }</p>
          <p>&bull;</p>
          <p className="text-gray-900 pb-3">View all jobs</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-900 pb-3"><FontAwesomeIcon icon={ faMoneyBill1Wave } /> { job.budget }</p>
          <p>&bull;</p>
          <p className="text-gray-900 pb-3"><FontAwesomeIcon icon={ faLocationDot } /> { job.company.address }</p>
          <p>&bull;</p>
          <p className="text-gray-900 pb-3"><FontAwesomeIcon icon={ faClock } /> { job.type }</p>
        </div>
      </div>

      <div className="text-gray-900 joblisting-body">
        { job.created_at_human }
      </div>

    </div>
  )
}
