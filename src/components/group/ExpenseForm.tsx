import React, { useEffect, useState } from 'react';
import { FormField } from '../ui/forms/FormField';
import styles from '../ui/forms/formStyles.module.css';
import { useApiQuery } from '../../hooks/useApiQuery';
import { useApiMutation } from '../../hooks/useApiMutation';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

interface User {
  id: string;
  username: string;
  email: string;
}

interface ExpenseFormProps {
  groupId: string;
  onExpenseAdded: () => void;
}

const expenseFormConfig = [
  { id: 'description', label: 'Description', placeholder: 'Expense description', required: true },
  { id: 'amount', label: 'Amount', placeholder: 'Amount', type: 'number', required: true },
  { id: 'date', label: 'Date', type: 'date', required: true },
];

type ExpenseFormValues = {
  description: string;
  amount: string;
  date: string;
};

type ExpenseFormErrors = Partial<Record<keyof ExpenseFormValues, string>>;

type SplitInput = {
  user_id: string;
  amount?: string;
  percentage?: string;
};

export default function ExpenseForm({ groupId, onExpenseAdded }: ExpenseFormProps) {
  const [values, setValues] = useState<ExpenseFormValues>({ description: '', amount: '', date: '' });
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [splits, setSplits] = useState<SplitInput[]>([]);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const { data: members = [] } = useApiQuery<User[]>(['groupMembers', groupId], API_ENDPOINTS.GROUP_MEMBERS(groupId));
  const addExpenseMutation = useApiMutation<{ id: string }>(`/groups/${groupId}/expenses`, 'POST');
  const splitExpenseMutation = useApiMutation(`/groups/${groupId}/split`, 'POST');

  useEffect(() => {
    // Reset splits when splitType changes
    if (splitType === 'equal' && members.length > 0) {
      setSplits(members.map((m) => ({ user_id: m.id })));
    } else if (splitType === 'custom' && members.length > 0) {
      setSplits(members.map((m) => ({ user_id: m.id })));
    }
  }, [splitType, members]);

  const handleChange = (field: keyof ExpenseFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSplitChange = (user_id: string, value: string) => {
    setSplits((prev) =>
      prev.map((split) =>
        split.user_id === user_id
          ? splitType === 'equal'
            ? { ...split }
            : splitType === 'custom'
              ? { ...split, [splitType === 'custom' ? (values.amount ? 'amount' : 'percentage') : 'amount']: value }
              : split
          : split
      )
    );
  };

  const handleCustomSplitChange = (user_id: string, field: 'amount' | 'percentage', value: string) => {
    setSplits((prev) =>
      prev.map((split) => split.user_id === user_id ? { ...split, [field]: value } : split)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackendError(null);
    setErrors({});
    try {
      const expense = await addExpenseMutation.mutateAsync(values);
      if (splits.length > 0 && splitType === 'custom') {
        await splitExpenseMutation.mutateAsync({ expenseId: expense.id, splits: splits.filter(s => s.amount || s.percentage) });
      }
      setValues({ description: '', amount: '', date: '' });
      setSplits([]);
      onExpenseAdded();
    } catch (err: any) {
      if (err?.response?.data) {
        const data = err.response.data;
        if (typeof data === 'object') setErrors(data as ExpenseFormErrors);
        else setBackendError(data);
      } else {
        setBackendError('Failed to add expense.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {expenseFormConfig.map((field) => (
        <FormField
          key={field.id}
          id={field.id}
          label={field.label}
          value={values[field.id as keyof ExpenseFormValues]}
          onChange={(value) => handleChange(field.id as keyof ExpenseFormValues, value)}
          placeholder={field.placeholder}
          required={field.required}
          type={field.type}
          error={errors[field.id as keyof ExpenseFormValues]}
          className={styles.formField}
        />
      ))}
      <div className={styles.formField}>
        <label className={styles.formLabel}>Split Type</label>
        <label>
          <input type="radio" checked={splitType === 'equal'} onChange={() => setSplitType('equal')} /> Equal Split
        </label>
        <label>
          <input type="radio" checked={splitType === 'custom'} onChange={() => setSplitType('custom')} /> Custom Split
        </label>
      </div>
      {splitType === 'equal' && members.length > 0 && (
        <div className={styles.formField}>
          <label className={styles.formLabel}>Split (Equal among all members)</label>
          <ul>
            {members.map((member) => (
              <li key={member.id}>{member.username} ({member.email})</li>
            ))}
          </ul>
        </div>
      )}
      {splitType === 'custom' && members.length > 0 && (
        <div className={styles.formField}>
          <label className={styles.formLabel}>Custom Split</label>
          {members.map((member) => (
            <div key={member.id} style={{ marginBottom: 8 }}>
              <span>{member.username} ({member.email}): </span>
              <input
                className={styles.formInput}
                type="number"
                placeholder="Amount"
                value={splits.find(s => s.user_id === member.id)?.amount || ''}
                onChange={e => handleCustomSplitChange(member.id, 'amount', e.target.value)}
                min="0"
                step="0.01"
                style={{ width: 100, marginRight: 8 }}
              />
              <span> or </span>
              <input
                className={styles.formInput}
                type="number"
                placeholder="%"
                value={splits.find(s => s.user_id === member.id)?.percentage || ''}
                onChange={e => handleCustomSplitChange(member.id, 'percentage', e.target.value)}
                min="0"
                max="100"
                step="0.01"
                style={{ width: 60 }}
              />
            </div>
          ))}
        </div>
      )}
      {backendError && <div className={styles.formError}>{backendError}</div>}
      <button className={styles.formButton} type="submit">Add Expense</button>
    </form>
  );
}
