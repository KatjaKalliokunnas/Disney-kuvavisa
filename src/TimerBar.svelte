<script>
  import { tweened } from 'svelte/motion';

  const countingBar = tweened(1, {
    duration: 100000,
  });

  const startTween = () => {
    countingBar.set(0);
  };

  startTween();
</script>

<p>Aikaa jäljellä</p>
<progress value={$countingBar} />

<style>
  progress {
    background-color: rgb(55, 224, 55);
    border-radius: 3em;
    width: 20em;
    height: 1em;
  }
</style>
