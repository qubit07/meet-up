import { subscribe } from "svelte/internal";
import { writable } from "svelte/store";

const meetups = writable([
  {
    id: "m1",
    title: "Fishing",
    description: "Do fishing in floating water",
    image: "images/images.png",
    isFavorite: false,
  },
  {
    id: "m2",
    title: "Cooking",
    description: "Cooking with Bobs Burgers",
    image: "images/images.png",
    isFavorite: false,
  },
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetups: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    };
    meetups.update((items) => {
      return [newMeetup, ...items];
    });
  },
  updateMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetups: (id) => {
    meetups.update((items) => {
      return items.filter((i) => i.id !== id);
    });
  },
  toogleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex((m) => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
};

export default customMeetupsStore;
