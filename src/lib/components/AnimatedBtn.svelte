<script lang="ts">
	import { onMount } from 'svelte';

	let btn: HTMLDivElement;
	let hiddenInp: HTMLInputElement;
	let thumbEl: HTMLElement;
	let trackEl: HTMLElement;

	onMount(() => {
		if (!hiddenInp || !thumbEl) return;

		btn.addEventListener('click', () => {
			hiddenInp.checked = !hiddenInp.checked;
			if (hiddenInp.checked) {
				thumbEl.style.transform = `translateX(calc(100% + 2 * var(--thumb-pad)))`;
			} else {
				thumbEl.style.transform = `translateX(0px)`;
			}
		});

		thumbEl.addEventListener('click', (ev) => ev.stopPropagation());

		thumbEl.addEventListener('mousedown', () => {
			const baseX = btn.getBoundingClientRect().left;
			const baseMaxX = btn.getBoundingClientRect().right;
			const thumbSize = thumbEl.getBoundingClientRect().width;
			let isClick = true;

			const mouseMove = (ev: MouseEvent) => {
				thumbEl.classList.add('active');

				if (ev.movementX > 2) {
					isClick = false;
				}

				const mouseX = ev.clientX - baseX - thumbSize / 2;

				thumbEl.style.transform = `translateX(${Math.max(
					0,
					Math.min(
						mouseX,
						baseMaxX -
							baseX -
							thumbSize -
							2 * parseInt(getComputedStyle(btn).getPropertyValue('--thumb-pad') ?? '0')
					)
				)}px)`;
			};

			const mouseUp = (ev: MouseEvent) => {
				thumbEl.classList.remove('active');
				// Check the position of the thumb and based on that move the thumb to the correct position
				const elX = thumbEl.getBoundingClientRect().left;

				if (isClick) {
					hiddenInp.checked = !hiddenInp.checked;
					if (hiddenInp.checked) {
						thumbEl.style.transform = `translateX(calc(100% + 2 * var(--thumb-pad)))`;
					} else {
						thumbEl.style.transform = `translateX(0px)`;
					}
				} else {
					if (elX - baseX + thumbSize / 2 < (baseMaxX - baseX) / 2) {
						hiddenInp.checked = false;
						thumbEl.style.transform = `translateX(0px)`;
					} else {
						hiddenInp.checked = true;
						thumbEl.style.transform = `translateX(calc(100% + 2 * var(--thumb-pad)))`;
					}
				}

				document.removeEventListener('mousemove', mouseMove);
				document.removeEventListener('mouseup', mouseUp);
			};

			document.addEventListener('mousemove', mouseMove);
			document.addEventListener('mouseup', mouseUp);
		});
	});
</script>

<div class="theme-btn" bind:this={btn}>
	<input type="checkbox" class="hidden-input" bind:this={hiddenInp} />
	<div class="track" bind:this={trackEl}>
		<div class="thumb" bind:this={thumbEl}>
			<div class="icons">
				<span class="material-symbols-outlined icon dark-icon"> dark_mode </span>
				<span class="material-symbols-outlined icon light-icon"> light_mode </span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.theme-btn {
		--h: 4rem;
		--w: 8rem;
		--border-size: 4px;
		--thumb-pad: 4px;
		--thumb-color: #d5a021;
		--track-color: #ede7d9;
		--btn-border-color: #a49694;
		--anime-time: 0.25s;

		border-radius: calc(var(--h) / 2);
		width: var(--w);
		height: var(--h);
		overflow: hidden;
		box-shadow: 0px 0px 0px var(--border-size) var(--btn-border-color);

		&,
		& * {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}

		&:has(.hidden-input:checked) {
			// Dark mode
			.thumb {
				.light-icon {
					animation: thumb-fade var(--anime-time) linear forwards;
				}

				.dark-icon {
					animation: thumb-fade-reverse var(--anime-time) linear forwards;
				}
			}
		}

		&:has(.hidden-input:not(:checked)) {
			.thumb {
				.light-icon {
					animation: thumb-fade-reverse var(--anime-time) linear forwards;
				}

				.dark-icon {
					animation: thumb-fade var(--anime-time) linear forwards;
				}
			}
		}

		.track {
			position: relative;
			background: var(--track-color);
			width: var(--w);
			height: var(--h);
			border: var(--thumb-pad) solid transparent;

			.thumb {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				aspect-ratio: 1;
				border-radius: 50%;
				background: var(--thumb-color);
				cursor: pointer;
				transition: scale var(--anime-time) ease-in-out;

				.icons {
					position: relative;
					width: 100%;
					height: 100%;
					user-select: none;
					pointer-events: none;

					.icon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						transform-origin: top left;
					}
				}

				&:active {
					cursor: grabbing;
					scale: 0.95;
				}

				&:not(.active) {
					transition:
						transform var(--anime-time) linear,
						scale var(--anime-time) ease-in-out;
				}
			}
		}

		.hidden-input {
			display: none;
		}
	}

	@keyframes thumb-fade {
		0% {
			rotate: 0deg;
			opacity: 1;
			scale: 1;
		}
		50% {
			opacity: 0;
			scale: 0.5;
			rotate: -180deg;
		}
		100% {
			opacity: 0;
			scale: 0.5;
			rotate: -180deg;
		}
	}

	@keyframes thumb-fade-reverse {
		0% {
			opacity: 0;
			scale: 0.5;
			rotate: -180deg;
		}
		50% {
			opacity: 0;
			scale: 0.5;
			rotate: -180deg;
		}
		100% {
			opacity: 1;
			scale: 1;
			rotate: 0deg;
		}
	}
</style>
