// instructors.ts
import redisModule from './connection';

export interface Person {
  username: string;
  email: string;
}

export interface Instructor extends Person {
  role: 'instructor';
}

export interface TA extends Person {
  role: 'ta';
}

export const savePerson = async (person: Person) => {
  await redisModule.hmset(person.username, person.email);
};

export const getPerson = async (role: 'instructor' | 'ta', username: string): Promise<Person | null> => {
  const data = await redisModule.hget(role, username);

  if (data) {
    return { username, email: data } as Person;
  } else {
    return null;
  }
};