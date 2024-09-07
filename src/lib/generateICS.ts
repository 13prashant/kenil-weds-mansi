import { createEvent, EventAttributes } from "ics";

export const generateICS = (event: EventAttributes) => {
  return new Promise((resolve, reject) => {
    createEvent(event, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
};
