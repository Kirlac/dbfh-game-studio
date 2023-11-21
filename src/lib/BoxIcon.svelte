<script lang="ts">
	import { onMount } from 'svelte';
	import { SolidIconsList, type RegularIcon, type SolidIcon, RegularIconsList } from './BoxIcon';

	export let type: 'regular' | 'solid' | undefined = undefined;

	export let name: RegularIcon | SolidIcon;

	let cssClass: string | undefined = undefined;
	export { cssClass as class };

	$: iconType = type
		? type
		: RegularIconsList.includes(name)
		  ? 'regular'
		  : SolidIconsList.includes(name)
		    ? 'solid'
		    : undefined;

	onMount(async () => {
		// Import boxicons in onMount because it needs to reference 'window'
		await import('boxicons');
	});
</script>

<box-icon type={iconType} {name} class={cssClass}></box-icon>
