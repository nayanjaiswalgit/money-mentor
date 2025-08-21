import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AccountsList } from '../components/accounts2/AccountsList';
import { Tabs } from '../components/ui/Tabs';
import { FileUploadModal } from '../components/upload/FileUploadModal';
import { UploadProgress } from '../components/upload/UploadProgress';
import { useFileUpload } from '../hooks/useFileUpload';
import { 
  useGetAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  Account
} from '../app/api/accountApi';
import { AddAccountModal } from "../components/accounts/forms/AddAccountModal";

const tabs = [
  { id: 'accounts', label: 'Bank Accounts' },
  { id: 'cards', label: 'Credit Cards' },
];

export function AccountsPage() {
  const [activeTab, setActiveTab] = useState<'accounts' | 'cards'>('accounts');
  const [showModal, setShowModal] = useState(false);

  const { data: accountsData, isLoading: accountsLoading, error: accountsError } =
    useGetAccountsQuery(undefined);
  
  const [createAccount] = useCreateAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  const handleAddAccount = async (data: Partial<Account>) => {
    try {
      await createAccount(data).unwrap();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add:', error);
    }
  };

  const handleUpdateAccount = async (id: string, data: Partial<Account>) => {
    try {
      await updateAccount({ id, data }).unwrap();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      await deleteAccount(id).unwrap();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
};

  const [uploadModalState, setUploadModalState] = useState<{
    isOpen: boolean;
    accountId?: string;
    accountName?: string;
  }>({ isOpen: false });
  
  const { uploads, uploadFiles, dismissUpload } = useFileUpload();

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

  const isLoading = accountsLoading;
  const error = accountsError;

  // Filter accounts and credit cards based on activeTab for rendering
  const displayedAccounts = activeTab === 'accounts' 
    ? accountsData?.results.filter(acc => !['visa', 'mastercard', 'amex'].includes(acc.type)) || []
    : accountsData?.results.filter(acc => ['visa', 'mastercard', 'amex'].includes(acc.type)) || [];

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
            accounts={displayedAccounts}
            onUpload={handleUpload}
            onUpdate={handleUpdateAccount}
            onDelete={handleDeleteAccount}
            activeTab={activeTab}
          />
        )}
      </div>

      <AddAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddAccount}
        type={activeTab}
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