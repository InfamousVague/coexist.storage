<script lang="ts">
	import { Accordion, AccordionItem, Appearance, Button, Shape, Text, ThemeSwitcher } from "june-uikit";
	import ColorPicker from "./personalize/ColorPicker.svelte";
	import { resetManifest } from "$lib/stores/manifest";
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
    <AccordionItem title="Developer">
        <div class="settings">
            <div class="setting">
                <div class="info">
                    <Text>Reload Manifest</Text>
                    <Text appearance={Appearance.Muted}>Reset the mock data on the page.</Text>
                </div>
                <div class="control">
                    <Button appearance={Appearance.Warning} shape={Shape.Pill} on:pressed={() => resetManifest()}>
                        Reset
                    </Button>
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

