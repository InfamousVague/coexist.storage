<script lang="ts">
	import {
		Folder as FolderComponent,
		File as FileComponent,
		PredefinedColor,
		SVGShape,
	} from 'june-uikit';
	import { getFiletypeColor } from '$lib/utils/files';
	import type { File, Folder } from '$lib/types';
	import { manifest as initialManifest } from '$lib/mock/mock.js';
	import { writable, get } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { path } from '$lib/stores/path';
	import { uiOptions } from '$lib/stores/ui';
	import List from './views/List.svelte';
	import Column from './views/Column.svelte';

	const manifest = writable<Folder>(structuredClone(initialManifest));
	const currentFolder = writable<Folder>(initialManifest);
	const dispatch = createEventDispatcher();

	type Item = File | Folder;
	let folderColor: PredefinedColor = PredefinedColor.BrewedMustard;

	let renamingFolderId: string | null = null;

	$: {
		let target: Folder = get(manifest);
		for (const name of $path) {
			const next = target.children.find((item) => item.type === 1 && item.name === name) as Folder;
			if (!next) break;
			target = next;
		}
		currentFolder.set(target);
	}

	function navigateToFolder(folder: Folder) {
		if (renamingFolderId === folder.id) return;
		path.set([...$path, folder.name]);
		dispatch('navigate', { path });
	}

	function getAvailableMoveTargets(excludeId: string): { id: string; text: string }[] {
		return $currentFolder.children
			.filter((item) => item.type === 1 && item.id !== excludeId)
			.map((folder) => ({
				id: folder.id,
				text: folder.name
			}));
	}
</script>

<div class="drive">
	{#if $uiOptions.layout === 'Grid'}
		{#each $currentFolder.children as item (item.id)}
			{#if item.type === 1}
				<FolderComponent
					name={item.name}
					bytes={item.size}
					items={item.children.length}
					open={false}
					color={folderColor}
					on:open={() => navigateToFolder(item)}
				/>
			{:else}
				<FileComponent
					name={item.name}
					bytes={item.size}
					type={item.extension}
					color={getFiletypeColor(item.extension)}
					additionalContext={[
						{
							id: 'move',
							text: 'Move',
							icon: SVGShape.FolderOpen,
							children: getAvailableMoveTargets(item.id).map((folder) => ({
								id: folder.id,
								text: folder.text,
								icon: SVGShape.FolderPlus
							}))
						}
					]}
				/>
			{/if}
		{/each}
	{:else if $uiOptions.layout === 'List'}
		<List
			{navigateToFolder}
			{getAvailableMoveTargets}
			{currentFolder}
			/>
	{:else if $uiOptions.layout === 'Column'}
		<Column
			{navigateToFolder}
			{getAvailableMoveTargets}
			{currentFolder}
			/>
	{/if}
</div>

<style lang="scss">
	@use './Drive.scss' as *;
</style>
