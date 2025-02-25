import { useEffect, useState } from 'react';

export interface Contact {
  _id: string;
  name: string;
  organisation?: string;
  serviceType?: string;
  elaboration?: string;
  phone: string;
  email: string;
}

const TableOne: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://admin-kappa-swart.vercel.app/api/contact/all');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Contact Submissions
      </h4>

      <div className="flex h-[500px]"> {/* Fixed height container */}
        {/* Left Panel - Fixed width with scroll */}
        <div className="w-1/3 border-r border-stroke dark:border-strokedark overflow-y-auto">
          <div className="pr-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 cursor-pointer hover:bg-gray-2 dark:hover:bg-meta-4 ${
                  selectedContact?._id === contact._id 
                    ? 'bg-gray-2 dark:bg-meta-4' 
                    : ''
                }`}
              >
                <p className="text-black dark:text-white truncate">
                  {contact.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Scrollable content */}
        <div className="w-2/3 pl-4 overflow-y-auto">
          {selectedContact ? (
            <div className="space-y-4 pr-4">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                Contact Details
              </h3>
              
              <DetailRow label="Name" value={selectedContact.name} />
              <DetailRow label="Email" value={selectedContact.email} />
              <DetailRow label="Phone" value={selectedContact.phone} />
              <DetailRow 
                label="Organisation" 
                value={selectedContact.organisation || 'N/A'} 
              />
              <DetailRow 
                label="Service Type" 
                value={selectedContact.serviceType || 'N/A'} 
              />
              <DetailRow
                label="Elaboration"
                value={selectedContact.elaboration || 'N/A'}
                isBlock
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string; isBlock?: boolean }> = ({ 
  label, 
  value,
  isBlock = false
}) => (
  <div className="border-b border-stroke dark:border-strokedark pb-2">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className={`mt-1 text-sm text-black dark:text-white ${
      isBlock ? 'whitespace-normal break-words' : 'truncate'
    }`}>
      {value}
    </dd>
  </div>
);

export default TableOne;