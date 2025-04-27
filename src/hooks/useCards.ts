import { api } from '../services/api';
import { useQueryWrapper } from './useQueryWrapper';
import { Card } from '../types';

export const useCards = (options = {}) => {
  return useQueryWrapper<Card[]>({
    queryKey: ['cards'],
    queryFn: api.cards.getAll,
    ...options,
  });
};

export const useCard = (id: string, options = {}) => {
  return useQueryWrapper<Card>({
    queryKey: ['cards', id],
    queryFn: () => api.cards.getById(id),
    enabled: !!id, // Only run the query if we have an ID
    ...options,
  });
}; 