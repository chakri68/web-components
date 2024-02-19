<script>
	import Preview from './PreviewElement.svelte';
</script>

<Preview
	style="background-color: pink; border-radius: 6px;"
	height="300px"
	width="400px"
	mouseEnterAnimation={false}
>
	<div slot="primary">
		<div style="width: 50px; aspect-ratio: 1; background-color: red;"></div>
	</div>
	<div slot="secondary" style="width: 100%; height: 100%;">
		<img src="/css-test.png" style="object-fit: cover;" alt="CSS" />
	</div>
</Preview>
