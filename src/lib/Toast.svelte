<script lang="ts">
  import { fly } from "svelte/transition";

</script>

<div class="notifications">
  <div class="toast" transition:fly={{ y: 30 }}>
    <div class="content">copied to clipboard</div>
  </div>
</div>

<style>
  .notifications {
      position: fixed;
      top: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      pointer-events: none;
  }

  .toast {
      flex: 0 0 auto;
      margin-bottom: 10px;
      background-color: rgb(51, 51, 51);
  }

  .content {
      padding: 10px;
      display: block;
      color: white;
      font-weight: 500;
  }
</style>
