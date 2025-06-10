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
		ModalKind,

		Select

	} from 'june-uikit';
	import { manifest } from '$lib/stores/manifest';
	import { path } from '$lib/stores/path';
	import { addFolderAtPath } from '$lib/utils/manifest';
	import { get } from 'svelte/store';
	import { uiOptions, type UILayout } from '$lib/stores/ui';
	import Settings from '$lib/components/settings/Settings.svelte';

	let showNewFolder: boolean = false;
	let newFolderName: string = '';
	let showSettings: boolean = false;

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
			lastModified: Date.now(),
			created: Date.now()
		};

		const updatedManifest = addFolderAtPath(currentManifest, currentPath, newFolder);
		manifest.set(updatedManifest);

		showNewFolder = false;
		newFolderName = '';
	}

	function handleSelectLayout(e: CustomEvent<any>) {
		console.log('e', e.detail.text)
		let layout: UILayout = e.detail.text as UILayout;
		uiOptions.setLayout(layout);
	}

	
	$: breadcrumbRoute = $path.join('/');
	$: $uiOptions.layout;
</script>

<Modal kind={ModalKind.Slide} open={showSettings} on:close={() => showSettings=false} title="Settings">
    <Settings />
</Modal>

<Modal open={showNewFolder} title="New Folder" dynamic on:close={() => (showNewFolder = false)}>
	<div class="new-folder">
		<div class="standard-controls">
			<Input
				placeholder="Folder Name..."
				shape={Shape.Pill}
				bind:value={newFolderName}
				autofocus
			/>
			<Button
				appearance={Appearance.Primary}
				shape={Shape.Pill}
				icon={SVGShape.Plus}
				text="Add"
				on:pressed={handleNewFolder}
			></Button>
		</div>
		<Card title="Settings">
			<div class="sync">
				<Checkbox size={Size.Small} /><Text>Sync across devices</Text>
			</div>
			<div class="sync">
				<Checkbox size={Size.Small} /><Text>Encrypt contents</Text>
			</div>
		</Card>
	</div>
</Modal>

<Toolbar shape={Shape.Pill}>
	<div slot="left" class="left">
		<ContextMenu
			items={[
				{ id: 'drivea', text: 'Drive A', icon: SVGShape.Drive },
				{ id: 'driveb', text: 'Drive B', icon: SVGShape.Drive },
				{ id: 'drivec', text: 'Drive C', icon: SVGShape.Drive },
				{ id: 'new', text: 'New Drive', icon: SVGShape.Plus }
			]}
			on:select={() => {}}
		>
			<Button
				icon={SVGShape.Drive}
				shape={Shape.Pill}
				on:pressed={handleHome}
				appearance={$path.join('/') === '' ? Appearance.Primary : Appearance.Secondary}
				text="Drive A"
			/>
		</ContextMenu>
	</div>

	<Breadcrumb route={breadcrumbRoute} on:navigate={(e) => handleNavigate(e.detail.path)} />

	<div slot="right" class="right">
		<ContextMenu
			leftClick
			items={[
				{ id: 'grid', text: 'Grid', icon: SVGShape.Grid },
				{ id: 'list', text: 'List', icon: SVGShape.List },
				{ id: 'column', text: 'Column', icon: SVGShape.Column }
			]}
			on:select={handleSelectLayout}
		>
			<Tooltip content="View" position={Position.Bottom}>
				<Button icon={$uiOptions.layout === "Grid" ? SVGShape.Grid : $uiOptions.layout === "List" ? SVGShape.List : SVGShape.Column } />
			</Tooltip>
		</ContextMenu>

		<Tooltip content="New Folder" position={Position.Bottom}>
			<Button icon={SVGShape.FolderPlus} on:pressed={() => (showNewFolder = true)} />
		</Tooltip>

		<Tooltip content="Upload" position={Position.Bottom}>
			<Button icon={SVGShape.Upload} />
		</Tooltip>

		<Input shape={Shape.Pill} icon={SVGShape.Search} placeholder="Search" />

		<Tooltip content="Settings" position={Position.Bottom}>
			<Button icon={SVGShape.Cog} on:pressed={() => showSettings = true}/>
		</Tooltip>
	</div>
</Toolbar>

<style lang="scss">
	.new-folder {
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
