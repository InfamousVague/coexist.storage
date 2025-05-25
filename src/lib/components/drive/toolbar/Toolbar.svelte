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
	} from 'june-uikit';
	import { createEventDispatcher } from 'svelte';
	import { path } from '$lib/stores/path';

	const dispatch = createEventDispatcher();

	function handleHome() {
		path.set([]);
	}

	function handleNavigate(pathStr: string) {
		const segments = pathStr.split('/').filter(Boolean);
		path.set(segments);
	}

	$: breadcrumbRoute = $path.join('/');
</script>

<Toolbar shape={Shape.Pill}>
	<div slot="left" class="left">
		<Tooltip content="Drive" position={Position.Bottom}>
			<Button icon={SVGShape.Home} on:pressed={handleHome} appearance={($path.join("/") === "") ? Appearance.Primary : Appearance.Secondary} />
		</Tooltip>
	</div>

	<Breadcrumb route={breadcrumbRoute} on:navigate={(e) => handleNavigate(e.detail.path)} />

	<div slot="right" class="right">
		<Tooltip content="New Folder" position={Position.Bottom}>
			<Button icon={SVGShape.FolderPlus} />
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
