<script lang="ts">
	import { Folder as FolderComponent, File as FileComponent, PredefinedColor } from 'june-uikit';
	import { getFiletypeColor } from '$lib/utils/files';
	import type { Folder } from '$lib/types';
	import { manifest } from '$lib/mock/mock.js';
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	export let path: string[] = [];

	const currentFolder = writable<Folder>(manifest);
	const dispatch = createEventDispatcher();

	$: {
		let target: Folder = manifest;
		for (const name of path) {
			const next = target.children.find((item) => item.type === 1 && item.name === name) as Folder;
			if (!next) break;
			target = next;
		}
		currentFolder.set(target);
	}

	function navigateToFolder(folder: Folder) {
		path = [...path, folder.name];
		dispatch("navigate", { path });
	}

	let folderColor: PredefinedColor = PredefinedColor.BrewedMustard;
</script>

<div class="drive">
    {#each $currentFolder.children as item (item.name)}
        {#if item.type === 1}
            <FolderComponent
                name={item.name}
                bytes={item.size}
                items={item.children.length}
                on:open={() => navigateToFolder(item)}
                color={folderColor}
            />
        {:else}
            <FileComponent
                name={item.name}
                bytes={item.size}
                type={item.extension}
                color={getFiletypeColor(item.extension)}
            />
        {/if}
    {/each}
</div>

<style lang="scss">
    @use "./Drive.scss" as *;
</style>