<script lang="ts">
  import { hexToRgb } from "../utils";

  export let color: string;
  
  $: rgb = hexToRgb(color);
</script>

{#if rgb}
<div>R: {rgb.r}</div>
<div class="gap"></div>
<div>G: {rgb.g}</div>
<div class="gap"></div>
<div>B: {rgb.b}</div>
{/if}

<style>
  .gap {
    width: 0.4rem;
  }
</style>