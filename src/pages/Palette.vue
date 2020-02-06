<template>
<div>
    <div class="canon-layout --tube --spacious">
        <h1>
            Accessible Palette Tool
        </h1>
    </div>
    <canon-palette />
</div>
</template>

<script>
import CanonPalette from '../components/Palette/Palette';
export default {
    name: 'PalettePage',
    components: {
        CanonPalette,
    },
}
</script>

<style>

</style>