<script lang="ts">
  import { PredefinedColor, SVGShape, Folder as FolderComponent, File as FileComponent } from 'june-uikit';
  import { getFiletypeColor } from '$lib/utils/files';
  import type { Folder as FolderType } from '$lib/types';

  export let navigateToFolder: (folder: FolderType) => void;
  export let getAvailableMoveTargets: (excludeId: string) => { id: string; text: string }[];
  export let currentFolder;

  let folderColor: PredefinedColor = PredefinedColor.BrewedMustard;
</script>

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
