<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../ui/Button.svelte";
  import Badge from "../ui/Badge.svelte";
  import meetups from "./meetups-store";

  export let id;
  export let title;
  export let description;
  export let image;
  export let isFavorite;

  const dispatch = createEventDispatcher();

  function tooglefavorite() {
    meetups.toogleFavorite(id);
  }
</script>

<article>
  <header>
    <h1>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{description}</h2>
  </header>
  <div class="image">
    <img src={image} alt={title} />
  </div>

  <div class="content">
    <p>{description}</p>
  </div>

  <footer>
    <Button type="button" mode="outline" on:click={() => dispatch("edit", id)}
      >Edit</Button
    >
    <Button type="button" on:click={() => dispatch("showdetails", id)}
      >Show Details</Button
    >
    <Button
      color={isFavorite ? null : "success"}
      mode="outline"
      type="button"
      on:click={tooglefavorite}
    >
      {isFavorite ? "Unfavorite" : "Favorite"}
    </Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
