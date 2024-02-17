<script lang="ts">
	import { onMount } from 'svelte';

	let previewEl: HTMLDivElement;
	let primaryEl: HTMLDivElement;
	let secondaryEl: HTMLDivElement;

	let isActive: boolean = false;

	function handleMouseEnter(ev: MouseEvent) {
		isActive = true;
		previewEl.addEventListener('mousemove', handleMouseMove);
		previewEl.addEventListener('mouseleave', handleMouseOut);
	}

	function handleMouseMove(ev: MouseEvent) {
		// Calculate the % of the mouse position relative to the preview element
		const width = previewEl.clientWidth;
		const xOffset = ev.clientX - previewEl.offsetLeft;
		const percentage = +((xOffset / width) * 100).toFixed(2);
		previewEl.style.setProperty('--primary-viewpoint', `${percentage}%`);
	}

	function handleMouseOut() {
		isActive = false;
		previewEl.style.setProperty('--primary-viewpoint', '100%');
		previewEl.removeEventListener('mousemove', handleMouseMove);
		previewEl.removeEventListener('mouseleave', handleMouseOut);
	}

	function handleClick() {
		previewEl.removeEventListener('mousemove', handleMouseMove);
		previewEl.removeEventListener('mouseleave', handleMouseOut);
	}
</script>

<div
	class="preview"
	class:active={isActive}
	bind:this={previewEl}
	on:mouseenter={handleMouseEnter}
	on:click={handleClick}
>
	<div class="primary" bind:this={primaryEl}>
		<slot name="primary" />
	</div>
	<div class="secondary" bind:this={secondaryEl}>
		<slot name="secondary" />
	</div>
</div>

<style lang="scss">
	.preview {
		--primary-viewpoint: 20%;

		position: relative;
		transform: rotate(0deg);
		min-height: 30rem;
		min-width: 30rem;

		.primary,
		.secondary {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: white;
		}

		.primary {
			left: 0;
			width: var(--primary-viewpoint);
			z-index: 2;
			overflow: hidden;

			/* TODO: Add Transition */
		}

		&.active {
			.primary {
				opacity: 0.75;
				border-right: 4px solid black;
			}
			cursor: ew-resize;
		}
	}
</style>
