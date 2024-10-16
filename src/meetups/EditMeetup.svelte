<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../ui/Button.svelte";
  import TextInput from "../ui/TextInput.svelte";
  import Modal from "./Modal.svelte";
  import { isEmpty } from "../helpers/validation.js";
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
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
