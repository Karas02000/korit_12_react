import HelloProps from './types.ts';

export default function HelloComponent({ name, age }: HelloProps) {
    return (
        <h1>
            Hello, {name}! You are {age} years old.
        </h1>
    );
}