import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AccountsList } from '../components/accounts2/AccountsList';
import { Tabs } from '../components/ui/Tabs';
import { FileUploadModal } from '../components/upload/FileUploadModal';
import { UploadProgress } from '../components/upload/UploadProgress';
import { useFileUpload } from '../hooks/useFileUpload';
import { useGetAccountQuery } from '../app/api/accountApi';
import { useCards } from '../hooks/useCards';
import {AddAccountModal} from "../components/accounts/forms/AddAccountModal";
import { Account } from '../types';

const tabs = [
  { id: 'accounts', label: 'Bank Accounts' },
  { id: 'cards', label: 'Credit Cards' },
];

export function AccountsPage() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [showModal, setShowModal] = useState(false);

const handleAddAccount = (data: any) => {
  console.log('New account/card:', data);
  // Handle the submission - refetch data after submission
  refetchAccounts();
  refetchCreditCards();
};

  const [uploadModalState, setUploadModalState] = useState<{
    isOpen: boolean;
    accountId?: string;
    accountName?: string;
  }>({ isOpen: false });
  
  const { uploads, uploadFiles, dismissUpload } = useFileUpload();

  const { data: accountsData, isLoading: accountsLoading, error: accountsError, refetch: refetchAccounts } = useGetAccountQuery({});
  const { data: creditCardsData, isLoading: creditCardsLoading, error: creditCardsError, refetch: refetchCreditCards } = useCards();

  const handleUpload = (accountId: string) => {
    const account = accountsData?.results.find((a: Account) => a.id === accountId);
    if (account) {
      setUploadModalState({
        isOpen: true,
        accountId,
        accountName: account.name
      });
    }
  };

  const handleModalUpload = (files: FileList) => {
    if (uploadModalState.accountId) {
      uploadFiles(files, uploadModalState.accountId);
      setUploadModalState({ isOpen: false });
    }
  };

  const isLoading = accountsLoading || creditCardsLoading;
  const error = accountsError || creditCardsError;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Accounts & Cards</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} className="mr-2" />
          Add {activeTab === 'accounts' ? 'Account' : 'Card'}
        </button>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {isLoading ? (
          <div>Loading {activeTab === 'accounts' ? 'accounts' : 'credit cards'}...</div>
        ) : error ? (
          <div>Error loading {activeTab === 'accounts' ? 'accounts' : 'credit cards'}</div>
        ) : (
          <AccountsList 
            accounts={accountsData?.results || []}
            creditCards={creditCardsData || []}
            onUpload={handleUpload}
            activeTab={activeTab}
          />
        )}
      </div>

      {/* AddAccountModal: Show when showModal is true */}
      <AddAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddAccount}
      />

      <FileUploadModal
        isOpen={uploadModalState.isOpen}
        onClose={() => setUploadModalState({ isOpen: false })}
        onUpload={handleModalUpload}
        accountName={uploadModalState.accountName || ''}
      />

      <UploadProgress
        uploads={uploads}
        onDismiss={dismissUpload}
      />
    </div>
  );
}