
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faMoneyBill1Wave, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function JobDetails({ job, trim = false }) {
  function getWords(str, numWords) {
    const words = str.trim().split(/\s+/); // Split by whitespace
    const selectedWords = words.slice(0, numWords);
    return selectedWords.join(' ');
  }

  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
      <div className="mb-4">
        <h1 className="text-gray-900 font-bold text-5xl pb-1">{ job.title }</h1>
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

      <p className="text-gray-900">
        { !trim ? (
          <span dangerouslySetInnerHTML={ { __html: job.description } } />
        ) : (
          <span dangerouslySetInnerHTML={ { __html: getWords(job.description, 25) } } />
        ) }
      </p>

    </div>
  )
}
