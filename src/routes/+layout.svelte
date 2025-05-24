<script lang="ts">
	import Settings from "$lib/components/settings/Settings.svelte";
    import { JuneUIKit, Filler, Navigation, Sidebar, SVGShape, Modal, ThemeSwitcher, ContextMenu, Tag, Appearance, Size, ModalKind } from "june-uikit";

    const routes = [
        { to: "/contacts", name: "Contacts", icon: SVGShape.Users },
        { to: "/activity", name: "Activity", icon: SVGShape.Pulse },
        { to: "/settings", name: "Settings", icon: SVGShape.Cog },
    ];


    let dockVirtical = true;

    const defaultRoute = "/"
    let activeRoute = defaultRoute;
</script>

<Modal kind={ModalKind.Slide} open={activeRoute === "/settings"} on:close={() => activeRoute = defaultRoute} title="Settings">
    <Settings />
</Modal>

<div class="tag-holder">
    <Tag content="v0.0.1" appearance={Appearance.Muted} size={Size.Small}></Tag>
</div>

<JuneUIKit></JuneUIKit>

<ContextMenu items={[
        {
            id: "position",
            text: "Dock Position",
            icon: SVGShape.Cog,
        },
        {
            id: "rotate",
            text: "Rotate Dock",
            icon: SVGShape.Cog,
        },
    ]}
    on:select={(e) => {
        let selected = e.detail;
        switch (selected.id) {
            case "rotate":
                console.log('test')
                dockVirtical = !dockVirtical;
                break;
            default:
                break;
        }
    }}>
    <div class="dock">
        <Navigation vertical={dockVirtical} {routes} active={activeRoute} on:navigate={(r) => activeRoute = r.detail.to} />
    </div>
</ContextMenu>

<slot></slot>

<style lang="scss">
    .dock {
        background: var(--color-background-secondary);
        border-radius: var(--border-radius-pill);
        position: absolute;
        bottom: var(--padding);
        left: var(--padding);
    }

    .tag-holder {
        position: absolute;
        bottom: var(--gap);
        right: var(--gap);
        pointer-events: none;
    }
</style>
