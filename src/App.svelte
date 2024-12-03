<script>
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import MeetupGrid from "./meetups/MeetupGrid.svelte";
  import Button from "./ui/Button.svelte";
  import Header from "./ui/Header.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import meetups from "./meetups/meetups-store.js";
  import MeetupDetails from "./meetups/MeetupDetails.svelte";

  let editMode = null;
  let editedId;
  let page = "overview";
  let pageData = {};

  function handleSubmitMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }
</script>

<Header></Header>

<main>
  {#if page === "overview"}
    {#if editMode === "edit"}
      <EditMeetup
        id={editedId}
        on:save={handleSubmitMeetup}
        on:cancel={cancelEdit}
      ></EditMeetup>
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={startEdit}
      on:add={() => {
        editMode = "edit";
      }}
    ></MeetupGrid>
  {:else}
    <MeetupDetails id={pageData.id} on:close={closeDetails}></MeetupDetails>
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
