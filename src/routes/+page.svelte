<script lang="ts">
	import { manifest } from '$lib/mock/mock.js';
	import type { Folder } from '$lib/types';
	import { writable, derived } from 'svelte/store';
	import Drive from '$lib/components/drive/Drive.svelte';
	import Toolbar from '$lib/components/drive/toolbar/Toolbar.svelte';
	import { path } from '$lib/stores/path';

	const currentFolder = writable<Folder>(manifest);

	function navigateToPath(pathStr: string) {
		const segments = pathStr.split('/').filter(Boolean);
		let target: Folder = manifest;

		for (const name of segments) {
			const next = target.children.find((item) => item.type === 1 && item.name === name) as Folder;
			if (!next) return;
			target = next;
		}

		path.set(segments);
		currentFolder.set(target);
	}

	derived(path, ($path) => {
		let target: Folder = manifest;
		for (const name of $path) {
			const next = target.children.find((item) => item.type === 1 && item.name === name) as Folder;
			if (!next) return;
			target = next;
		}
		currentFolder.set(target);
	});
</script>

<div id="drive">
	<Toolbar
		on:home={() => {
			path.set([]);
			currentFolder.set(manifest);
		}}
		on:navigate={(e) => navigateToPath(e.detail.path)}
	/>
	<Drive />
</div>

<style lang="scss">
	@use '$lib/Global.scss' as *;

	#drive {
		display: inline-flex;
		flex-direction: column;
		gap: var(--gap);
		padding: var(--padding-more);
		flex: 1;
		height: calc(100vh - (var(--padding-more) * 2));
		width: calc(100vw - (var(--padding-more) * 2));
		overflow: hidden;
	}
</style>
