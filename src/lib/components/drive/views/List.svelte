<script lang="ts">
	import { Text, Appearance, Icon, Size, SVGShape, getIconForType } from 'june-uikit';
	import { getFiletypeColor } from '$lib/utils/files';
	import { formatDate } from '$lib/utils';
	import { writable, get } from 'svelte/store';
	import type { Folder, File } from '$lib/types';
	import { dndzone } from 'svelte-dnd-action';
	import { manifest } from '$lib/stores/manifest';
	import { path } from '$lib/stores/path';

	export let navigateToFolder: (folder: Folder) => void;
	export let getAvailableMoveTargets: (excludeId: string) => { id: string; text: string }[];
	export let currentFolder = writable<Folder>();

	function findFolderByPath(folder: Folder, segments: string[]): Folder | null {
		let current = folder;
		for (const name of segments) {
			const next = current.children.find((item) => item.type === 1 && item.name === name);
			if (!next) return null;
			current = next as Folder;
		}
		return current;
	}
</script>

<div class="list-view">
	<div class="list-header">
		<span><Text appearance={Appearance.Muted}>Name</Text></span>
		<span><Text appearance={Appearance.Muted}>ID</Text></span>
		<span><Text appearance={Appearance.Muted}>Extension</Text></span>
		<span><Text appearance={Appearance.Muted}>Items</Text></span>
		<span><Text appearance={Appearance.Muted}>Modified</Text></span>
		<span><Text appearance={Appearance.Muted}>Created</Text></span>
	</div>

    {#each $currentFolder.children as item (item.id)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="list-item" on:click={() => item.type === 1 && navigateToFolder(item as Folder)}>
            <span>
                <div class="item-info">
                    {#if item.type === 1}
                        <Icon icon={SVGShape.Folder} size={Size.Medium} color={getFiletypeColor('folder')} />
                    {:else}
                        <Icon
                            icon={getIconForType(item.extension)}
                            size={Size.Medium}
                            color={getFiletypeColor(item.extension)}
                        />
                    {/if}
                    <Text>{item.name}</Text>
                </div>
            </span>
            <span><Text singleLine>{item.id}</Text></span>
            <span><Text>{item.type === 0 ? item.extension : '-'}</Text></span>
            <span><Text>{item.type === 1 ? item.children.length : '-'}</Text></span>
            <span><Text>{formatDate(item.lastModified)}</Text></span>
            <span><Text>{formatDate(item.created)}</Text></span>
        </div>
    {/each}
</div>

<style lang="scss">
	@use './List.scss' as *;
</style>
