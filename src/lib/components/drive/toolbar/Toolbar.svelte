<script lang="ts">
  import {
    Breadcrumb,
    Toolbar,
    Input,
    SVGShape,
    Button,
    Shape,
    Tooltip,
    Position,
    ContextMenu,
    Appearance,
	Text,
	Modal,
	Checkbox,
	Size,
	Card,
	Highlight,
  } from 'june-uikit';
  import { manifest } from '$lib/stores/manifest';
  import { path } from '$lib/stores/path';
  import { addFolderAtPath } from '$lib/utils/manifest';
  import { get } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleHome() {
    path.set([]);
  }

  function handleNavigate(pathStr: string) {
    const segments = pathStr.split('/').filter(Boolean);
    path.set(segments);
  }

  function handleNewFolder() {
    const currentManifest = get(manifest);
    const currentPath = get(path);

    const newFolder = {
      id: crypto.randomUUID(),
      type: 1,
      name: newFolderName,
      children: [],
      size: 0,
    };

    const updatedManifest = addFolderAtPath(currentManifest, currentPath, newFolder);
    manifest.set(updatedManifest);

	showNewFolder = false;
	newFolderName = "";
  }

  $: breadcrumbRoute = $path.join('/');

  let showNewFolder: boolean = false;
  let newFolderName: string = "";
</script>

<Modal open={showNewFolder} title="New Folder" dynamic on:close={() => showNewFolder = false}>
	<div class="new-folder">
		<div class="standard-controls">
			<Input placeholder="Folder Name..." shape={Shape.Pill} bind:value={newFolderName} highlight={newFolderName.length ? Highlight.None : Highlight.Info} />
			<Button appearance={Appearance.Primary} shape={Shape.Pill} icon={SVGShape.Plus} text="Add" on:pressed={handleNewFolder}></Button>
		</div>
		<Card title="Settings">
			<div class="sync">
				<Checkbox size={Size.Small} /><Text>Sync across devices?</Text>
			</div>
		</Card>
	</div>
</Modal>

<Toolbar shape={Shape.Pill}>
	<div slot="left" class="left">
		<Tooltip content="Drive" position={Position.Bottom}>
			<Button icon={SVGShape.Home} on:pressed={handleHome} appearance={($path.join("/") === "") ? Appearance.Primary : Appearance.Secondary} />
		</Tooltip>
	</div>

	<Breadcrumb route={breadcrumbRoute} on:navigate={(e) => handleNavigate(e.detail.path)} />

	<div slot="right" class="right">
		<Tooltip content="New Folder" position={Position.Bottom}>
			<Button icon={SVGShape.FolderPlus} on:pressed={() => showNewFolder = true}/>
		</Tooltip>

		<ContextMenu
			leftClick
			items={[
				{ id: 'file', text: 'File', icon: SVGShape.Plus },
				{ id: 'drive', text: 'Drive', icon: SVGShape.Plus }
			]}
		>
			<Tooltip content="Add" position={Position.Bottom}>
				<Button icon={SVGShape.Plus} />
			</Tooltip>
		</ContextMenu>

		<Input shape={Shape.Pill} icon={SVGShape.Search} placeholder="Search" />
	</div>
</Toolbar>


<style lang="scss">
	.new-folder{
		display: inline-flex;
		flex-direction: column;
		gap: var(--gap);

		.sync {
			display: inline-flex;
			align-items: center;
			gap: var(--gap);
		}

		.standard-controls {
			display: inline-flex;
			gap: var(--gap-less);
		}
	}
</style>