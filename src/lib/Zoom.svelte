<script lang="ts">
  import { getCanvasCells } from "./utils";
  export let gridSize: number;
  export let canvasRef: HTMLCanvasElement;
  export let cx = 0;
  export let cy = 0;

  let cells: string[] = [];

  $: {
    cells = [];
    if (canvasRef) {
      cells = getCanvasCells(canvasRef, gridSize, cx, cy);
    }
  };
  
</script>

{#if cells.length > 0}
  <div class="grid" style="grid-template-columns: repeat({gridSize}, 1fr); grid-template-rows: repeat({gridSize}, 1fr); width: calc({gridSize}rem">
    {#each cells as cell, j}
      <div class="grid-item {j === Math.floor(cells.length / 2) ? 'grid-item__selected' : ''}" style="background-color: #{cell}"></div>
    {/each}
  </div>
{/if}


<style>
  .grid {
    display: grid;
    gap: 0px;
    clip-path: circle(50% at center);
  }

  .grid-item {
    width: 1rem;
    height: 1rem;
  }

  .grid-item__selected:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: 1rem;
    box-shadow: 
    0 0 0 1px rgb(255, 255, 255), 
    0 0 0 2px rgb(0, 0, 0);
    transform: translate(-50%, -50%);
  }
</style>