<script lang="ts">
	import { Icon, SVGShape, Text, Size, Appearance, Card, Tag } from 'june-uikit';
	import { getFiletypeColor } from '$lib/utils/files';
	import { getIconForType } from 'june-uikit';
	import { path } from '$lib/stores/path';
	import { manifest } from '$lib/stores/manifest';
	import { get } from 'svelte/store';
	import type { File, Folder } from '$lib/types';
	import { formatDate } from '$lib/utils';

	export let currentFolder: import('svelte/store').Writable<Folder>;
	export let navigateToFolder: (folder: Folder) => void;
	export let getAvailableMoveTargets: (excludeId: string) => { id: string; text: string }[];

	let activeItem: File;
	$: if ($currentFolder) {
		const firstFile = $currentFolder.children.find((item) => item.type === 0) as File;
		activeItem = firstFile ?? null;
	}
	$: activeColor = activeItem ? getFiletypeColor(activeItem.extension) : undefined;

	function handleClick(item: any, parentPath: string[]) {
		if (item.type === 0) {
			activeItem = item;
			if (parentPath.length < $path.length) {
				// User clicked a file in the parent column: go back
				path.set(parentPath);
			}
		} else if (item.type === 1) {
			path.set([...parentPath, item.name]);
		}
	}

	$: atRoot = $path.length === 0;

	function findFolderByPath(folder: Folder, segments: string[]): Folder | null {
		let current = folder;
		for (const name of segments) {
			const next = current.children.find((item) => item.type === 1 && item.name === name);
			if (!next) return null;
			current = next as Folder;
		}
		return current;
	}

	$: parentFolder = !atRoot ? findFolderByPath(get(manifest), $path.slice(0, -1)) : $currentFolder;
</script>

<div class="column-layout">
	<div class="column-panel">
		{#if parentFolder}
			{#each parentFolder.children as item (item.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="list-item" on:click={() => handleClick(item, $path.slice(0, -1))}>
					<div class="item-info">
						<Icon
							icon={item.type === 1 ? SVGShape.Folder : getIconForType(item.extension)}
							size={Size.Medium}
							color={getFiletypeColor(item.type === 1 ? 'folder' : item.extension)}
						/>
						<Text singleLine>{item.name}{item.type === 0 ? `.${item.extension}` : ''}</Text>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	{#if !atRoot}
		<div class="column-panel">
			{#each $currentFolder.children as item (item.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="list-item" on:click={() => handleClick(item, $path)}>
					<div class="item-info">
						<Icon
							icon={item.type === 1 ? SVGShape.Folder : getIconForType(item.extension)}
							size={Size.Medium}
							color={getFiletypeColor(item.type === 1 ? 'folder' : item.extension)}
						/>
						<Text singleLine>{item.name}{item.type === 0 ? `.${item.extension}` : ''}</Text>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="column-preview">
		{#if activeItem}
			<Card title="Preview">
				<div class="preview">
					<div class="basics">
						<Icon
							icon={getIconForType(activeItem.extension)}
							color={activeColor}
							size={Size.ExtraLarge}
						/>
						<Text>{activeItem.name}</Text>
						<Text appearance={Appearance.Muted}>.{activeItem.extension} - {activeItem.size}</Text>
					</div>
					<div class="metadata-wrap">
						<div class="metadata-head">
							<Text appearance={Appearance.Muted} size={Size.Small}>Metadata</Text>
						</div>
						<div class="metadata">
							<Tag
								hole={false}
								size={Size.Small}
								content={`ID: ${activeItem.id}`}
								appearance={Appearance.Muted}
							/>
							<Tag
								hole={false}
								size={Size.Small}
								content={`Modified: ${formatDate(activeItem.lastModified)}`}
								appearance={Appearance.Muted}
							/>
							<Tag
								hole={false}
								size={Size.Small}
								content={`Created: ${formatDate(activeItem.created)}`}
								appearance={Appearance.Muted}
							/>
						</div>
					</div>
				</div>
			</Card>
		{:else}
			todo
		{/if}
	</div>
</div>

<style lang="scss">
	@use "./Column.scss" as *;
</style>
