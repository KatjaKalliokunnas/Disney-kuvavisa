<!-- Yleiskäyttöinen painike -->

<button on:click>
  <slot />
</button>

<style>
  button {
    height: 3em;
    width: 12em;
    background-color: #d1d1d1;
    color: #7f29b4;
    border-radius: 2em;
    border: 2px solid #7f29b4;
  }
  button:hover {
    background-color: #b7b6b6;
  }
</style>
