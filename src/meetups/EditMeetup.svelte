<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../ui/Button.svelte";
  import TextInput from "../ui/TextInput.svelte";
  import Modal from "./Modal.svelte";
  import { isEmpty } from "../helpers/validation.js";
  import meetups from "./meetups-store.js";

  export let id = null;

  let title = "";
  let description = "";
  let image = "";

  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);

      title = selectedMeetup.title;
      description = selectedMeetup.description;
      image = selectedMeetup.image;
    });
    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  function submitForm() {
    const newMeetup = {
      title: title,
      description: description,
      image: image,
    };

    if (id) {
      meetups.updateMeetup(id, newMeetup);
    } else {
      meetups.addMeetups(newMeetup);
    }
    dispatch("save");
  }
  function cancelForm() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    meetups.removeMeetups(id);
    dispatch("save");
  }

  $: isTitleValid = !isEmpty(title);
  $: isDescriptionValid = !isEmpty(description);
  $: isFormValid = isTitleValid && isDescriptionValid;
</script>

<Modal title="Added meetup data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={isTitleValid}
      validityMessage="Please enter a valid title."
      controlType="text"
      value={title}
      on:input={(event) => (title = event.target.value)}
    ></TextInput>
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      valid={isDescriptionValid}
      validityMessage="Please enter a valid description."
      value={description}
      on:input={(event) => (description = event.target.value)}
    ></TextInput>
    <TextInput
      id="image"
      label="Image"
      controlType="text"
      value={image}
      on:input={(event) => (image = event.target.value)}
    ></TextInput>
  </form>
  <div slot="footer">
    <Button type="submit" on:click={cancelForm}>Cancel</Button>
    <Button type="submit" disabled={!isFormValid} on:click={submitForm}
      >Save</Button
    >
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
