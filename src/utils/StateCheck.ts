import { State } from "../flux/Store";

export function isStateValid(state: State): boolean {
    if (state.user === null) {
        return false;
    }

    const { name, age } = state.user;
    return name.trim().length > 0 && age > 0;
}