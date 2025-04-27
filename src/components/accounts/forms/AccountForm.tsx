import React from 'react';
import { Building2 } from 'lucide-react';
import { FormField } from '../../ui/forms/FormField';
import styles from '../../ui/forms/formStyles.module.css';
import { AccountType } from '../../../types';

interface AccountFormValues {
  accountName: string;
  accountType: AccountType;
  accountNumber: string;
  routingNumber: string;
}

interface AccountFormProps {
  values: AccountFormValues;
  errors?: Partial<Record<keyof AccountFormValues, string>>;
  onFieldChange: (field: keyof AccountFormValues, value: string) => void;
  accountTypeOptions?: { value: string; label: string }[];
}

const defaultAccountTypeOptions = [
  { value: 'checking', label: 'Checking' },
  { value: 'savings', label: 'Savings' },
  { value: 'money_market', label: 'Money Market' },
];

const accountFormConfig: Array<{
  id: keyof AccountFormValues;
  label: string;
  icon?: any;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
}> = [
  {
    id: 'accountName',
    label: 'Account Name',
    icon: Building2,
    placeholder: 'e.g. Primary Checking',
    required: true,
  },
  {
    id: 'accountNumber',
    label: 'Account Number',
    placeholder: 'Enter account number',
    required: true,
  },
  {
    id: 'routingNumber',
    label: 'Routing Number',
    placeholder: '9 digit routing number',
    pattern: '^\\d{9}$',
    maxLength: 9,
    required: true,
  },
];

export function AccountForm({
  values,
  errors = {},
  onFieldChange,
  accountTypeOptions = defaultAccountTypeOptions,
}: AccountFormProps) {
  return (
    <form className={styles.formContainer} autoComplete="off">
      {accountFormConfig.map((field) => (
        <FormField
          key={field.id}
          id={field.id}
          label={field.label}
          value={values[field.id]}
          onChange={(value) => onFieldChange(field.id, value)}
          icon={field.icon}
          placeholder={field.placeholder}
          required={field.required}
          pattern={field.pattern}
          maxLength={field.maxLength}
          error={errors[field.id]}
          className={styles.formField}
        />
      ))}
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="accountType">
          Account Type
        </label>
        <select
          id="accountType"
          value={values.accountType}
          onChange={(e) => onFieldChange('accountType', e.target.value)}
          className={styles.formInput}
        >
          {accountTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.accountType && (
          <div className={styles.formError}>{errors.accountType}</div>
        )}
      </div>
    </form>
  );
}