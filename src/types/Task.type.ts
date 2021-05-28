import { randomString } from 'fp-tools';

export interface Task {
  accumulatedTime: number;
  completed: boolean;
  completedDate?: Date;
  description: string;
  id: string;
  isActive: boolean;
  name: string;
  notes: string;
  originalEstimate: string;
  priority: number;
  relatedFeature: string;
  startedDate: Date | null;
}

export const emptyTask = (): Task => {
  return {
    accumulatedTime: 0,
    completed: false,
    description: 'type to edit',
    id: randomString(),
    isActive: false,
    name: 'type to edit',
    notes: 'type to edit',
    originalEstimate: '0',
    priority: 1,
    relatedFeature: 'type to edit',
    startedDate: null,
  };
};
