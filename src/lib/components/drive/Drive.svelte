<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { Folder as FolderComponent, File as FileComponent, PredefinedColor } from 'june-uikit';
	import { getFiletypeColor } from '$lib/utils/files';
	import type { File, Folder } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { manifest } from '$lib/stores/manifest';
	import { get } from 'svelte/store';

	// Props
	export let path: string[] = [];

	const dispatch = createEventDispatcher();

	type Item = File | Folder;
	let folderColor: PredefinedColor = PredefinedColor.BrewedMustard;
	let renamingFolderId: string | null = null;

	function getFolderByPath(folder: Folder, path: string[]): Folder {
		let current = folder;
		for (const segment of path) {
			const next = current.children.find(
				(item) => item.type === 1 && item.name === segment
			) as Folder | undefined;
			if (!next) break;
			current = next;
		}
		return current;
	}

	function updateFolderChildrenByPath(folder: Folder, path: string[], items: Item[]): Folder {
		if (path.length === 0) {
			return { ...folder, children: items };
		}

		const [currentName, ...rest] = path;
		return {
			...folder,
			children: folder.children.map((child) => {
				if (child.type === 1 && child.name === currentName) {
					return updateFolderChildrenByPath(child, rest, items);
				}
				return child;
			})
		};
	}

	function navigateToFolder(folder: Folder) {
		if (renamingFolderId === folder.id) return;
		path = [...path, folder.name];
		dispatch("navigate", { path });
	}

	function handleDnd(event: CustomEvent<{ items: Item[] }>) {
		const { items } = event.detail;
		const current = get(manifest);
		const updated = updateFolderChildrenByPath(current, path, items);
		manifest.set(updated);
	}
</script>

<div
	class="drive"
	use:dndzone={{
		items: getFolderByPath($manifest, path).children,
		flipDurationMs: 150,
		dragDisabled: false,
		dropFromOthersDisabled: true
	}}
	on:consider={handleDnd}
	on:finalize={handleDnd}
>
	{#each getFolderByPath($manifest, path).children as item (item.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			data-id={item.id}
			class="draggable-item"
		>
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
				/>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	@use "./Drive.scss" as *;

	.drive {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
		outline: none !important;
		border: none;
	}

	.draggable-item {
		outline: none;
		cursor: default;
	}
</style>
