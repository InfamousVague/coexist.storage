<script lang="ts">
	import { Position, PredefinedColor, Swatch, Tooltip, type Color } from "june-uikit";
    import { primaryColor } from '$lib/stores/color';
    const colors = Object.values(PredefinedColor);

    function handleSwatchClick(color: Color) {
        document.documentElement.style.setProperty('--color-primary', color);
        primaryColor.set(color);
	}
</script>

{#each colors as color}
    <Tooltip position={Position.Top} content={color}>
        <Swatch {color} on:pressed={(e) => handleSwatchClick(e.detail)}/>
    </Tooltip>
{/each}