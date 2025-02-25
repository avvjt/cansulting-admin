import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Job {
  _id: string;
  position: string;
  description: string;
  requirements: string;
}

const FormLayout = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    position: '',
    description: '',
    requirements: ''
  });

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://admin-kappa-swart.vercel.app/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://admin-kappa-swart.vercel.app/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to post job');
      
      setFormData({ position: '', description: '', requirements: '' });
      fetchJobs();
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      const response = await fetch(`https://admin-kappa-swart.vercel.app/api/jobs/${jobId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete job');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Jobs Dashboard" />

      <div className="grid grid-cols-1 gap-9">
        {/* Job Posting Form */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Post New Job
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Position <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter job position"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter job description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Requirements <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter job requirements"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>

        {/* Jobs List */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Posted Jobs
            </h3>
          </div>
          <div className="p-6.5">
            {jobs.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-300">
                No jobs posted yet
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex items-center justify-between rounded border border-stroke p-4 dark:border-strokedark"
                  >
                    <div>
                      <h4 className="font-medium text-black dark:text-white">
                        {job.position}
                      </h4>
                      
                    </div>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="rounded bg-danger px-4 py-2 font-medium text-white hover:bg-opacity-90"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;