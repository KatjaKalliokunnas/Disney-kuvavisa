<script>
  import player from './staticsStore';
  import { get } from 'svelte/store';
  import Button from './Button.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let playerName;
</script>

<div class="backdrop" />
<div class="modal">
  <h3>Onnea {playerName}</h3>
  <p>Pärjäsit hienosti</p>
  <p>Sait {get(player).scores} pistettä!</p>
  <Button on:click={() => dispatch('quitgame')}>Sulje</Button>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10vw;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    overflow: scroll;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
</style>
