<script>
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let playerName = '';
  export let isValid;
  export let errorMessage;
  export let isEmpty;
</script>

<p>Syötä nimesi aloittaaksesi</p>

<label for="name">
  <input type="text" bind:value={playerName} maxlength="16" />
</label>
<!-- Näyttää virheviestin sen perusteella onko inputkentässä tekstiä -->
{#if !isValid && errorMessage && isEmpty}
  <p class="error">{errorMessage}</p>
{/if}
<h3>Säännöt</h3>
<div class="textbox">
  <p>
    Pelissä näet kuvia Disney hahmoista ja tehtävänäsi on arvata joko hahmon
    nimi tai mistä elokuvasta kyseinen hahmo on tuttu. Vastaa niin moneen
    kysymykseen kun kerkeät 2 minuutin aikana. Oikeasta vastauksta saat 2
    pistettä ja väärästä vähennetään yksi piste
  </p>
</div>
<!-- Välittää App.svelte komponentille aloita-nimisen tapahtuman, jolla käynnistetään peli startGame-funktiolla -->
<Button on:click={() => dispatch('start')}>Aloita peli</Button>

<style>
  p {
    font-weight: 600;
    font-size: 2.25;
  }
  input {
    height: 3em;
    width: 14em;
    background-color: rgba(182, 177, 245, 0.25);
    border: solid 2px #b6b1f5;
    border-radius: 0.5em;
  }
  .textbox {
    margin: auto;
    width: 50%;
    padding: 0 2em;
    margin-bottom: 3em;
  }
  .error {
    color: red;
  }
</style>
