<script>
	import Preview from '$lib/components/Preview.svelte';
</script>

<Preview>
	<div slot="primary">
		<h1>Primary</h1>
	</div>
	<div slot="secondary">
		<h1>Secondary</h1>
	</div>
</Preview>

<style>
	:global(body) {
		display: grid;
		place-items: center;
		min-height: 100vh;
		min-width: 100vw;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
</style>
