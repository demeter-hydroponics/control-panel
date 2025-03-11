<script>
  import { CircleX, CircleCheck } from 'lucide-svelte';
  // Props for the card component
  export let title = "";
  export let content = "";

  export let connected = false;
  
</script>

<div class="bg-white rounded-lg p-4 shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

 <div class="flex justify-between items-start">
    <h3 class="text-lg font-semibold mb-2 text-black">{title}</h3>
    {#if connected}
    <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center" title="Connected">
        <CircleCheck />
    </div>
    {:else}
    <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center" title="Connected">
        <CircleX />
    </div>
    {/if}
  </div>

    <p class="text-black">{content}</p>
</div>
