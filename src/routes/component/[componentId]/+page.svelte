<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	let Component: null | any = null;
	let error: null | string = null;
	let loading: boolean = true;

	onMount(() => {
		import(`../../../lib/components/${data.componentName}.example.svelte`)
			.then((module) => {
				Component = module.default;
			})
			.catch((e) => {
				error = 'Component not found';
				console.error(e);
			})
			.finally(() => {
				loading = false;
			});
	});
</script>

<main>
	{#if loading}
		<p>Loading...</p>
	{:else if error}
		<p>{error}</p>
	{:else}
		<svelte:component this={Component} />
	{/if}
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
