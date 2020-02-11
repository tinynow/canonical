<template>
<div class="flex flex-wrap">
    <div
        class="pa3 flex-grow-1"
        :class="`bg--${baseColor}`"
        :style="{color: color}"
    >
        <strong>Emboldened</strong>
        <p class="canon-u-type--3">
            At a safe size
        </p>
        <button
            type="button pa3"
            class="reset-button pv2 ph3 br1"
            :class="`text--${baseColor}`"
            :style="{'background-color': color}"
        >
            A button
        </button>
        <p>At the default font size</p>
        <p class="canon-u-type--7">
            *Be careful, you may not be able to read this!
        </p>
    </div>
    <div
        class="pa3 flex-grow-1"
        :class="`text--${baseColor}`"
        :style="{'background-color': color}"
    >
        <strong>Emboldened</strong>
        <p
            class="canon-u-type--3"
        >
            At a safe size
        </p>
        <button
            class="reset-button pv2 ph3 br1"
            :class="`bg--${baseColor}`"
            :style="{color: color}"
            type="button"
        >
            A button
        </button>
        <p>At the default font size</p>
        <p class="canon-u-type--7">
            *Be careful, you may not be able to read this!
        </p>
    </div>
</div>
</template>

<script>
    export default {
        name: 'CanonTypeSpecimen',
        props: {
            color: {
                type: String,
                required: true,
            },
            baseColor: {
                type: String,
                required: true,
                validator(val) {
                    return ['light', 'dark'].includes(val);
                },
            },
        },
    }
</script>
