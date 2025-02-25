import { useEffect, useState } from 'react';

export interface CareerSubmission {
  _id: string;
  name: string;
  organisation?: string;
  phone: string;
  email: string;
  about?: string;
  reasonForJoining?: string;
}

const Settings: React.FC = () => {
  const [submissions, setSubmissions] = useState<CareerSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<CareerSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('https://admin-kappa-swart.vercel.app/api/career/all');
        if (!response.ok) throw new Error('Failed to fetch career submissions');
        const data: CareerSubmission[] = await response.json();
        setSubmissions(data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Career Submissions
      </h4>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : submissions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No submissions found.</p>
      ) : (
        <div className="flex h-[500px]">
          {/* Left Panel - List of Submissions */}
          <div className="w-1/3 border-r border-stroke dark:border-strokedark overflow-y-auto">
            <div className="pr-4">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-meta-4 ${
                    selectedSubmission?._id === submission._id ? 'bg-gray-200 dark:bg-meta-4' : ''
                  }`}
                >
                  <p className="text-black dark:text-white truncate">{submission.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Submission Details */}
          <div className="w-2/3 pl-4 overflow-y-auto">
            {selectedSubmission ? (
              <div className="space-y-4 pr-4">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  Submission Details
                </h3>

                <DetailRow label="Name" value={selectedSubmission.name} />
                <DetailRow label="Email" value={selectedSubmission.email} />
                <DetailRow label="Phone" value={selectedSubmission.phone} />
                <DetailRow label="Organisation" value={selectedSubmission.organisation || 'N/A'} />
                <DetailRow label="About" value={selectedSubmission.about || 'N/A'} isBlock />
                <DetailRow label="Reason for Joining" value={selectedSubmission.reasonForJoining || 'N/A'} isBlock />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                Select a submission to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; isBlock?: boolean }> = ({ label, value, isBlock = false }) => (
  <div className="border-b border-stroke dark:border-strokedark pb-2">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className={`mt-1 text-sm text-black dark:text-white ${isBlock ? 'whitespace-normal break-words' : 'truncate'}`}>
      {value}
    </dd>
  </div>
);

export default Settings;
