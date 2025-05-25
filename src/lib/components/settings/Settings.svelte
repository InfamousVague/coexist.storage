<script lang="ts">
	import { Accordion, AccordionItem, Appearance, Text, ThemeSwitcher } from "june-uikit";
	import ColorPicker from "./personalize/ColorPicker.svelte";
</script>

<Accordion >
    <AccordionItem title="Personalize" open>
        <div class="settings">
            <div class="setting">
                <div class="info">
                    <Text>Change Theme</Text>
                    <Text appearance={Appearance.Muted}>Change the look and feel of the app.</Text>
                </div>
                <div class="control">
                    <ThemeSwitcher />
                </div>
            </div>
            <div class="setting">
                <div class="info">
                    <Text>Change Primary Color</Text>
                    <Text appearance={Appearance.Muted}>Change the primary color of the current theme.</Text>
                </div>
            </div>
            <div class="setting">
                <div class="control">
                    <ColorPicker />
                </div>
            </div>
        </div>
    </AccordionItem>
</Accordion>

<style lang="scss">
    .settings {
        display: inline-flex;
        width: 100%;
        flex-direction: column;
        gap: var(--gap);

        .setting {
            display: inline-flex;
            gap: var(--gap);
            width: 100%;

            .info {
                flex: 1;
            }
            .control {
                min-width: fit-content;
                display: inline-flex;
                flex-wrap: wrap;
                gap: var(--gap);
            }
        }
    }
</style>

