<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../ui/Button.svelte";
  import TextInput from "../ui/TextInput.svelte";
  import Modal from "./Modal.svelte";

  let title = "";
  let description = "";
  let image = "";
  const dispatch = createEventDispatcher();

  function submitForm() {
    dispatch("save", {
      title: title,
      description: description,
      image: image,
    });
  }
  function cancelForm() {
    dispatch("cancel");
  }
</script>

<Modal title="Added meetup data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      controlType="text"
      value={title}
      on:input={(event) => (title = event.target.value)}
    ></TextInput>
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
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
    <Button type="submit" on:click={submitForm}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
