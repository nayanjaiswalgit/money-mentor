import api, { creditCardAPI } from '../services/api';
import { useQueryWrapper } from './useQueryWrapper';
import { Card } from '../types';

export const useCards = (options = {}) => {
  return useQueryWrapper<Card[]>({ 
    queryKey: ['cards'],
    queryFn: async () => {
      const data = await creditCardAPI.getAll();
      return data; 
    },
    ...options,
  });
};

export const useCard = (id: string, options = {}) => {
  return useQueryWrapper<Card>({
    queryKey: ['cards', id],
    queryFn: async () => {
      const data = await creditCardAPI.getById(id);
      return data; 
    },
    enabled: !!id, 
    ...options,
  });
}; 