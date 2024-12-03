<script>
  import MeetupFilter from "./MeetupFilter.svelte";
  import MeetupItem from "./MeetupItem.svelte";
  import Button from "../ui/Button.svelte";
  import { createEventDispatcher } from "svelte";

  export let meetups;

  const dispatch = createEventDispatcher();

  let favsOnly = false;

  $: filteredMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<section id="meetups-controls">
  <MeetupFilter on:select={setFilter}></MeetupFilter>
  <Button on:click={() => dispatch("add")}>New Meetup</Button>
</section>
<section id="meetups">
  {#each filteredMeetups as meetup}
    <MeetupItem
      id={meetup.id}
      title={meetup.title}
      description={meetup.description}
      image={meetup.image}
      isFavorite={meetup.isFavorite}
      on:showdetails
      on:edit
    ></MeetupItem>
  {/each}
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetups-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
