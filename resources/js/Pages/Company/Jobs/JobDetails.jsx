
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
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 font-bold text-5xl pb-1">{ job.title }</h1>
          <div>
            { job.status === 'live' &&
              <p className="text-xs text-gray-500">Active Until: { job.expires_at }</p>
            }
            <div className="mt-1 flex justify-end items-center gap-x-1.5">
              <div className={ `flex-none rounded-full ${getStatus().color}/20 p-1` }>
                <div className={ `h-1.5 w-1.5 rounded-full ${getStatus().color}` }></div>
              </div>
              <p className="leading-5 text-gray-500">{ getStatus().text }</p>
            </div>
          </div>
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
        { !trim ? (
          <span dangerouslySetInnerHTML={ { __html: job.description } } />
        ) : (
          <span dangerouslySetInnerHTML={ { __html: getWords(job.description, trimCount) } } />
        ) }
      </div>

    </div>
  )
}
