<script lang="ts">
    import { JuneUIKit, Tag, Appearance, Size } from "june-uikit";
</script>

<div class="tag-holder">
    <Tag content="v0.0.1" appearance={Appearance.Muted} size={Size.Small}></Tag>
</div>

<JuneUIKit></JuneUIKit>

<slot></slot>

<style lang="scss">
    .tag-holder {
        position: absolute;
        bottom: var(--gap);
        right: var(--gap);
        pointer-events: none;
    }
</style>
