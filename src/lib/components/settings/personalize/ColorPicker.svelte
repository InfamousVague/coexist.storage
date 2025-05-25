<script lang="ts">
	import { Position, PredefinedColor, Swatch, Tooltip, type Color } from "june-uikit";

    const colors = Object.values(PredefinedColor);
    function handleSwatchClick(color: Color) {
		document.documentElement.style.setProperty('--color-primary', color);
	}
</script>

{#each colors as color}
    <Tooltip position={Position.Top} content={color}>
        <Swatch {color} on:pressed={(e) => handleSwatchClick(e.detail)}/>
    </Tooltip>
{/each}