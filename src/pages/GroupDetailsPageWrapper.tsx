import React from 'react';
import { useParams } from 'react-router-dom';
import GroupDetailsPage from './GroupDetailsPage';

const GroupDetailsPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <GroupDetailsPage groupId={id || ''} />;
};

export default GroupDetailsPageWrapper; 