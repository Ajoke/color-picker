<script lang="ts">
  import { hexToCMYK } from "../utils";

  export let color: string;
  
  $: cmyk = hexToCMYK(color);
</script>

{#if cmyk}
<div>C: {cmyk[0].toFixed(3)}</div>
<div class="gap"></div>
<div>M: {cmyk[1].toFixed(3)}</div>
<div class="gap"></div>
<div>Y: {cmyk[2].toFixed(3)}</div>
<div class="gap"></div>
<div>K: {cmyk[3].toFixed(3)}</div>
{/if}

<style>
  .gap {
    width: 0.4rem;
  }
</style>