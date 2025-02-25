"use client";
import { useState, useEffect, FormEvent } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

interface Process {
  id: string; // Keeping `id` as it was in the backend
  phase: string;
  name: string;
  review: string;
}

const FormElements: React.FC = () => {
  const [phaseNumber, setPhaseNumber] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await fetch("https://admin-kappa-swart.vercel.app/api/process");
      if (!response.ok) throw new Error("Failed to fetch");
      const data: Process[] = await response.json();
      setProcesses(data);
    } catch (error) {
      console.error("Error fetching processes:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phaseNumber === "") return;

    const phase = `${String(phaseNumber).padStart(2, "0")}. Phase`;
    const newProcess = { phase, name, review };

    try {
      const response = await fetch("https://admin-kappa-swart.vercel.app/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProcess),
      });

      if (!response.ok) throw new Error("Failed to add process");

      setPhaseNumber("");
      setName("");
      setReview("");
      fetchProcesses(); // Refresh list after adding
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://admin-kappa-swart.vercel.app/api/process/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete process");

      setProcesses((prev) => prev.filter((process) => process.id !== id)); // Update UI instantly
    } catch (error) {
      console.error("Error deleting process:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Process Management" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Process Phase
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Phase Number
                </label>
                <input
                  type="number"
                  value={phaseNumber}
                  onChange={(e) => setPhaseNumber(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Enter phase number (e.g., 1)"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name (e.g., Discovery)"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">Review</label>
                <textarea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Enter process description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Add Process
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Current Processes
              </h3>
            </div>
            <div className="p-6.5">
              {processes.length > 0 ? (
                processes.map((process) => (
                  <div key={process.id} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-black dark:text-white">
                          {process.phase} - {process.name}
                        </h4>
                        <p className="text-sm mt-1">{process.review}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(process.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No processes added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
