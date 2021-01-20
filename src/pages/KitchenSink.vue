<template>
<div class="canon-layout --tube ph1">
    <h1>Kitchen Sink</h1>
    <h2>Text editor</h2>
    <canon-editor />
</div>
</template>

<script>
import CanonEditor from '../components/Editor/Editor';
export default {
    name: 'KitchenSinkPage',
    components: {
        CanonEditor,
    },
}
</script>
