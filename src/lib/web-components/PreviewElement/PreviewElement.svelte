<script lang="ts">
	export let style = '';
	export let width: string = '30rem';
	export let height: string = '30rem';
	export let mouseEnterAnimation: boolean = true;

	let previewEl: HTMLDivElement;

	let isActive: boolean = false;
	let noTransition: boolean = false;

	function handleMouseEnter(ev: MouseEvent) {
		isActive = true;
		noTransition = !mouseEnterAnimation;
	}

	function handleMouseMove(ev: MouseEvent) {
		const width = previewEl.clientWidth;
		const xOffset = ev.clientX - previewEl.offsetLeft;
		const percentage = +((xOffset / width) * 100).toFixed(2);
		previewEl.style.setProperty('--primary-viewpoint', `${percentage}%`);
	}

	function handleMouseOut() {
		previewEl.style.setProperty('--primary-viewpoint', '100%');
		isActive = false;
		noTransition = false;
	}

	function handleClick() {
		isActive = false;
	}

	const handleTransitionEnd = mouseEnterAnimation
		? (ev: TransitionEvent) => {
				if (ev.propertyName === 'width' && isActive) {
					noTransition = true;
				}
			}
		: null;
</script>

<div
	class="preview"
	class:active={isActive}
	bind:this={previewEl}
	on:mouseenter={handleMouseEnter}
	on:click={handleClick}
	on:mousemove={isActive ? handleMouseMove : null}
	on:mouseleave={isActive ? handleMouseOut : null}
	style={style + `width: ${width}; height: ${height};`}
>
	<div class="primary" on:transitionend={handleTransitionEnd} class:noTransition>
		<slot name="primary" />
	</div>
	<div class="secondary">
		<slot name="secondary" />
	</div>
</div>

<style lang="scss">
	.preview {
		--primary-viewpoint: 100%;

		position: relative;
		transform: rotate(0deg);
		background-color: white;
		overflow: hidden;

		.primary,
		.secondary {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
		}

		.primary {
			left: 0;
			width: var(--primary-viewpoint);
			z-index: 2;
			overflow: hidden;
			background-color: inherit;
			transition: all 0.3s ease-in-out;

			&.noTransition {
				transition:
					opacity 0.3s ease-in-out,
					border-right 0.3s ease-in-out;
			}
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
