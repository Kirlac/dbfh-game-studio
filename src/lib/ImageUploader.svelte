<script lang="ts">
	import { imageToBase64 } from './Base64Encoder';

	let imageBase64: unknown;
	async function loadImage(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		let file = event?.currentTarget?.files?.[0];
		if (file) {
			imageBase64 = await imageToBase64(file);
		}
	}
</script>

<section>
	<h3>Image to base64 converter test</h3>
	<input type="file" on:change={loadImage} />
	<pre class="whitespace-break-spaces break-words">
			{imageBase64}
		</pre>
</section>
