<script lang="ts">
	import {
		type SolidIcon,
		SolidIconsList,
		type RegularIcon,
		RegularIconsList,
		type BrandIcon,
		BrandIconsList
	} from './Icon';

	export let type: 'solid' | 'brands' | undefined = undefined;

	export let name: SolidIcon | RegularIcon | BrandIcon;

	let cssClass: string | undefined = undefined;
	export { cssClass as class };

	$: iconType = type
		? type
		: SolidIconsList.includes(name)
		  ? 'solid'
		  : RegularIconsList.includes(name)
		    ? 'regular'
		    : BrandIconsList.includes(name)
		      ? 'brands'
		      : undefined;
</script>

<i class="fa-{iconType} fa-{name} {cssClass}"></i>
