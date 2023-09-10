<script lang="ts">
  import { onMount } from 'svelte';
  import ColorCodes from './ColorCodes.svelte';
  import Zoom from './Zoom.svelte';
  import { hasBrowserReadyForFeature, getCanvasCells } from './utils';

  const gridSize = 9;

  let canvasRef: HTMLCanvasElement;
  let cx = 0;
  let cy = 0;
  let mouseX = 0;
  let mouseY = 0;
  let inputRef: HTMLInputElement;
  let colors: string[] = []
  let showZoom = false;
  let fileLoaded = false;

  onMount(() => {
    document.onpaste = function(pasteEvent) {
      if(pasteEvent === null || pasteEvent.clipboardData === null) {
        return;
      }
      var item = pasteEvent.clipboardData.items[0];
  
      if (item.type.indexOf("image") === 0)
      {
          var blob = item.getAsFile();
          if (blob === null) {
            return;
          }
  
          var reader = new FileReader();
          reader.onload = onLoadReader;
  
          reader.readAsDataURL(blob);
      }
    };
    return () => {
      document.onpaste = null;
    }
  });

  const onLoadReader = function(this: FileReader) {
    const image = new Image();
    image.src = this.result?.toString() || '';
    image.onload = () => {
      if (!canvasRef) {
        return;
      }
      canvasRef.width = image.width;
      canvasRef.height = image.height;
      const context = canvasRef.getContext('2d');
      if (!context) {
        return;
      }
      context.drawImage(image, 0, 0);
      fileLoaded = true;
    }
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const reader = new FileReader();
    if (!event.dataTransfer) {
      return;
    }
    reader.readAsDataURL(event.dataTransfer.files[0]);
    reader.onload = onLoadReader;
  }

  const handleMove = (event: MouseEvent) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
    cx = mouseX - canvasRef.offsetLeft;
    cy = mouseY - canvasRef.offsetTop;
  }

  const handleClick = (event: MouseEvent) => {
    const cells = getCanvasCells(canvasRef, gridSize, cx, cy);
    colors.push(cells[Math.floor(cells.length / 2)]);
    colors = colors;
  }

  const handleChange = () => {
    if (!inputRef || !inputRef.files) {
      return;
    }
    const file = inputRef.files[0];
		
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", onLoadReader);
      reader.readAsDataURL(file);
			
			return;
    } 
  }
</script>

{#if hasBrowserReadyForFeature()}
  <div class="dropzone" on:drop={handleDrop} role="img">
    <input
      bind:this={inputRef}
      on:change={handleChange}
      type="file"
    />
  </div>
  <canvas
    on:mousemove={handleMove}
    bind:this={canvasRef}
    on:click={handleClick}
    on:mouseenter={() => showZoom = fileLoaded}
    on:mouseleave={() => showZoom = false}
  ></canvas>
  {#if showZoom}
    <div class="zoom-wrap" style="left: {mouseX + 20}px; top: {mouseY + 20}px">
      <Zoom canvasRef={canvasRef} cx={cx} cy={cy} {gridSize}/>
    </div>
  {/if}
  <ColorCodes colors={colors} />
{:else}
  <div>Browser doesn't support some of needed features</div>
{/if}

<style>

.dropzone {
    background-color: white;
    outline: 2px dashed black;
    outline-offset: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    height: 5rem;
    margin: 0 auto;
  }

  .zoom-wrap {
    position: absolute;
  }
</style>