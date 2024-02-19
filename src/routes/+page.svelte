<script lang="ts">
	import Components from '$lib/web-components/index.js';
</script>

<h1 class="text-6xl font-bold">Welcome to my web-components showcase!</h1>

<p>
	Here you can find a collection of web-components that I've created to showcase my skills and
	knowledge in web development.
</p>

<p class="text-3xl font-bold my-4">Here are the components</p>

<ol class="flex gap-4 flex-col">
	{#each Components as componentName}
		<li class="link"><a href={`/component/${componentName}`}>{componentName}</a></li>
	{/each}
</ol>

<style lang="scss">
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
