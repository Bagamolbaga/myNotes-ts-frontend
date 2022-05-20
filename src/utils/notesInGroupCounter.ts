import { INote } from "../types/state";

export const notesInGroupCounter = (notes: INote[]) => {
  let counter: any = {};

  notes.forEach((note) => {
    counter[note.group_id] =
      counter[note.group_id] === undefined ? 1 : counter[note.group_id] + 1;
  });
  return counter;
};
