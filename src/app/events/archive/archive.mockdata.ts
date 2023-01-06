import { Event } from '../event.interface';

export const mockArchiveEvent1: Event = {
  id: 1,
  title: 'Test Archived event 1',
  description: 'Test Archived event 1 description',
  dateOfEvent: '2020-12-12',
  tags: [
    {
      id: 1,
      subject: 'Test Archived tag 1',
    },
    {
      id: 2,
      subject: 'Test Archived tag 2',
    },
  ],
  userId: '1',
};

export const mockArchivedEvents: Event[] = [mockArchiveEvent1];
