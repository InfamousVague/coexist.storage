<script>
	import { Accordion, AccordionItem, Appearance, SVGShape, Text, ThemeSwitcher } from "june-uikit";



</script>

<Accordion >
    <AccordionItem title="Personalize" open>
        <div class="setting">
            <div class="info">
                <Text>Change Theme</Text>
                <Text appearance={Appearance.Muted}>Change the look and feel of the app.</Text>
            </div>
            <div class="control">
                <ThemeSwitcher />
            </div>
        </div>
    </AccordionItem>
</Accordion>

<style lang="scss">
    .setting {
        display: inline-flex;
        gap: var(--gap);

        .info {
            flex: 1;
        }
        .control {
            min-width: fit-content;
        }
    }
</style>

