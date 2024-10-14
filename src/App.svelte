<script>
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import MeetupGrid from "./meetups/MeetupGrid.svelte";
  import Button from "./ui/Button.svelte";
  import Header from "./ui/Header.svelte";
  import TextInput from "./ui/TextInput.svelte";

  let meetups = [
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
  ];

  let editMode = null;

  function handleSubmitMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      description: event.detail.description,
      image: event.detail.image,
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function tooglefavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find((m) => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex((m) => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    editMode = null;
  }
</script>

<Header></Header>

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = "add")}>New Meetup</Button>
  </div>
  {#if editMode}
    <EditMeetup on:save={handleSubmitMeetup} on:cancel={cancelEdit}
    ></EditMeetup>
  {/if}
  <MeetupGrid {meetups} on:tooglefavorite={tooglefavorite}></MeetupGrid>
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>
