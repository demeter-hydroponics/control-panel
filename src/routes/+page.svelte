<script>
    import { apiDataStore, connectedStore } from '$lib/stores';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { RangeSlider } from '@skeletonlabs/skeleton';
    import { CircleX, CircleCheck } from 'lucide-svelte';


    const PumpStateOptions = [
        { value: 'PUMP_OFF', label: 'OFF' },
        { value: 'PUMP_ON', label: 'ON' },
        { value: 'PUMP_SCHEDULE', label: 'SCHEDULE' }
    ];
    const MixingStateOptions = [
        { value: 'OVERRIDE_VALVE_OFF', label: 'OFF' },
        { value: 'OVERRIDE_VALVE_ON', label: 'ON' },
        { value: 'NO_OVERRIDE', label: 'SCHEDULE' }
    ];

</script>

<div class="flex w-full min-h-screen">
  <!-- Main content section (3/4 of the screen) -->
  <section class="w-full p-8 bg-white">
    <h2 class="text-2xl font-bold mb-4 text-black">Farm Configs</h2>
    <div class="flex overflow-x-auto gap-4 pb-4">
    {#if $apiDataStore && $apiDataStore.Columns && $connectedStore}
      {#each $apiDataStore.Columns as column}
      <div class="flex flex-col w-1/3 mx-auto ">
        <div class="bg-blue-100 rounded-lg shadow p-5 text-black">
            <div class="flex items-center justify-between w-full">
                <h2 class="text-black">Name: {$apiDataStore.Controllers[column.Id].Name} </h2>
                {#if $connectedStore && $connectedStore.includes(column.Id)}
                    <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center" title="Connected">
                        <CircleCheck />
                    </div>
                {:else}
                    <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center" title="Connected">
                        <CircleX />
                    </div>
                {/if}
            </div>
            <!-- <h2 class="text-black">Id: {column.Id} </h2> -->

            <div class="flex items-center justify-between w-full">
                <h2 class="text-black">Primary Pump State:  </h2>
                <RadioGroup>
                    {#each PumpStateOptions as option}
                        <RadioItem bind:group={column.PrimaryPumpState} value={option.value} name="basic-radio">
                        {option.label}
                        </RadioItem>
                    {/each}
                </RadioGroup>
            </div>
            <div class="flex items-center justify-between w-full">
                <h2 class="text-black">Secondary Pump State:  </h2>
                <RadioGroup>
                    {#each PumpStateOptions as option}
                        <RadioItem bind:group={column.SecondaryPumpState} value={option.value} name="basic-radio">
                        {option.label}
                        </RadioItem>
                    {/each}
                </RadioGroup>
            </div>

            <div class="flex items-center justify-between w-full">
                <h2 class="text-black">Nutrient Mixing Valve State:  </h2>
                <RadioGroup>
                    {#each MixingStateOptions as option}
                        <RadioItem bind:group={column.MixingState} value={option.value} name="basic-radio">
                        {option.label}
                        </RadioItem>
                    {/each}
                </RadioGroup>
            </div>

            <div class="flex items-center justify-between w-full">
                <h2 class="text-black">Fresh Water Valve State:  </h2>
                <RadioGroup>
                    {#each MixingStateOptions as option}
                        <RadioItem bind:group={column.WaterLevelState} value={option.value} name="basic-radio">
                        {option.label}
                        </RadioItem>
                    {/each}
                </RadioGroup>
            </div>
        </div>
        <!-- Nodes -->
        {#if column.Nodes && column.Nodes.length > 0}
            {#each column.Nodes as node}
                <div class="w-3/4 bg-green-100 p-5 m-5 rounded border text-black">
                    <div class="flex items-center justify-between w-full">
                        <h2 class="text-black">Name: {$apiDataStore.Controllers[node.Id].Name} </h2>
                        {#if $connectedStore && $connectedStore.includes(node.Id)}
                            <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center" title="Connected">
                                <CircleCheck />
                            </div>
                        {:else}
                            <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center" title="Connected">
                                <CircleX />
                            </div>
                        {/if}
                    </div>
                    <!-- <h2 class="text-black">Id: {node.Id} </h2> -->
                    <RangeSlider name="range-slider" bind:value={node.PPFD} max={300} step={20} ticked>
	                    <div class="flex justify-between items-center text-black">
		                    <div class="font-bold">Light Level (PPFD):</div>
		                    <div class="text-xs">{node.PPFD} / 300</div>
	                    </div>
                    </RangeSlider>
                </div>
            {/each}

            {:else}
              <p class="text-sm text-gray-500">No nodes found</p>
            {/if}

      </div>
      {/each}
      {/if}
    </div>

    <!-- <pre class="text-2xl font-bold mb-4 text-black" >{JSON.stringify($apiDataStore, null, 2)}</pre>  -->
  </section>
</div>
