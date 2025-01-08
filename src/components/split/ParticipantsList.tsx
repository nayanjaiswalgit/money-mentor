import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  share: number;
}

interface Props {
  splitType: 'equal' | 'percentage' | 'custom';
}

export function ParticipantsList({ splitType }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'You', share: 0 },
  ]);

  const addParticipant = () => {
    const newId = (participants.length + 1).toString();
    setParticipants([...participants, { id: newId, name: '', share: 0 }]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const updateParticipant = (id: string, field: keyof Participant, value: string | number) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Participants</label>
        <button
          type="button"
          onClick={addParticipant}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add Person
        </button>
      </div>

      <div className="space-y-2">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center space-x-2">
            <input
              type="text"
              value={participant.name}
              onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
              className="flex-1 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Name"
            />
            {splitType !== 'equal' && (
              <input
                type="number"
                value={participant.share}
                onChange={(e) => updateParticipant(participant.id, 'share', e.target.value)}
                className="w-24 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={splitType === 'percentage' ? 'Share %' : 'Amount'}
              />
            )}
            {participant.id !== '1' && (
              <button
                type="button"
                onClick={() => removeParticipant(participant.id)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}