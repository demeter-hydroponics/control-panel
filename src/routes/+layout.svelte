<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { RotateCw, ArrowRight, Trash2 } from 'lucide-svelte';

    import { onMount } from 'svelte';

    import { apiDataStore, connectedStore } from '$lib/stores';


    async function sendDataToServer() {
    try {
      const response = await fetch('http://192.168.1.51:12345/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($apiDataStore)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      alert('Data sent successfully!');
    } catch (error) {
      console.error('Error sending data:', error);
      alert(`Failed to send data: ${error.message}`);
    }
  }

  async function fetchConnected() {
    try {
      const response = await fetch('http://192.168.1.51:12345/connected');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data recieved!');
      console.log('connected:', JSON.stringify(data, null, 2));
      connectedStore.set(data); // Update the store

    } catch (error) {
      console.error('Error fetching connected:', error);
    }
  }

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:12345/config/default');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data recieved!');
      console.log('API Data:', JSON.stringify(data, null, 2));
      apiDataStore.set(data); // Update the store

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Load data when the component mounts
  onMount(() => {
    fetchData();
    fetchConnected();
  });
  
  // Function to manually refresh data (for the button click)
  function refreshData() {
    fetchData();
    fetchConnected();
  }

  function refreshConnected() {
    fetchConnected();
  }

</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Demeter</strong>
			</svelte:fragment>
		    <svelte:fragment slot="trail">
                <button type="button" on:click={refreshData} class="btn-icon variant-filled-primary">
                    <Trash2 />
                </button>
                <button type="button" on:click={refreshConnected} class="btn-icon variant-filled-primary">
                    <RotateCw />
                </button>
                <button type="button" on:click={sendDataToServer} class="btn-icon variant-filled-primary">
                    <ArrowRight />
                </button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
