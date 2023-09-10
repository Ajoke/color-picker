<script lang="ts">
  import CopyClipboard from "./CopyClipboard.svelte";
  import Toast from "./Toast.svelte";
  import Cmyk from "./schemas/Cmyk.svelte";
  import Rgb from "./schemas/Rgb.svelte";

  export let colors: string[] = [];

  let clipboardRef: HTMLDivElement;
  let showNotification = false;

  const copy = (color: string) => () => {
		const app = new CopyClipboard({
			target: clipboardRef,
			props: { name: color },
		});
		app.$destroy();
    showNotification = true;
    setTimeout(() => {
      showNotification = false;
    }, 1000);
	}

</script>

<div>
  {#each colors as color}
    <div class="color-snap">
      <button on:click={copy(color)} style="background-color: #{color}"></button>
      <div class="color-hex">#{color}</div>
      <div class="gap"></div>
      <Cmyk color={color} />
      <div class="gap"></div>
      <Rgb color={color} />
    </div>
  {/each}
</div>
<div bind:this={clipboardRef}></div>
{#if showNotification}<Toast />{/if}

<style>
  .color-snap {
    display: flex;
    align-items: center;
  }
  .gap {
    width: 1.5rem;
  }
  .color-hex {
    width: 4rem;
  }
  button {
    width: 1rem;
    height: 1rem;
    border-radius: 0%;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0;
    }
</style>