// instructors.ts
import redisModule from '../redis';

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
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await redisModule.hmset(person.username, person.email);
};

export const getPerson = async (role: 'instructor' | 'ta', username: string): Promise<Person | null> => {
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const data: string | null = await redisModule.hget(role, username);

    if (data) {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const person: Person = { username, email: data };
        return person;
    }
    return null;
};
