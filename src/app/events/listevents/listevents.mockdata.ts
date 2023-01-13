import { Event } from '../event.interface';

export const mockEvent1: Event = {
  id: 1,
  title: 'Test event 1',
  description: 'Test event 1 description',
  dateOfEvent: '2020-12-12',
  tags: [
    {
      id: 1,
      subject: 'Test tag 1',
<<<<<<< HEAD
      count: 1,
=======
      count: 0,
>>>>>>> development
    },
    {
      id: 2,
      subject: 'Test tag 2',
<<<<<<< HEAD
      count: 1,
=======
      count: 0,
>>>>>>> development
    },
  ],
  userId: '1',
};

export const mockEvent2: Event = {
  id: 2,
  title: 'Test event 2',
  description: 'Test event 2 description',
  dateOfEvent: '2020-12-12',
  tags: [
    {
      id: 1,
      subject: 'Test tag 1',
      count: 1,
    },
    {
      id: 2,
      subject: 'Test tag 2',
      count: 1,
    },
  ],
  userId: '2',
};

export const mockEvents: Event[] = [mockEvent1, mockEvent2];
