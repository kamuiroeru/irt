<template>
  <div class="grid grid-cols-12 grid-rows-1 w-full">
    <div class="col-span-11">
      <div class="bg-green-600" :style="stylePercentage">　</div>
    </div>
    <div
      class="col-span-1 col-start-12 justify-between items-center text-center"
    >
      {{ percentageForDisplay }}
    </div>
  </div>
  <div class="text-center text-2xl">
    {{ props.label }}
    <template v-if="!isDirectPercentage">
      {{ processedFileCount }} / {{ fileCountAll }}
    </template>
  </div>
</template>

<script setup lang="ts">
type PropType = {
  label: string;
  fileCountAll?: number;
  processedFileCount?: number;
  directPercentage?: number;
};
const props = withDefaults(defineProps<PropType>(), {
  label: "処理中...",
  fileCountAll: 100,
  processedFileCount: 1,
  directPercentage: -1,
});

const isDirectPercentage = computed<boolean>(() => props.directPercentage >= 0);

const percentage = computed<number>(() => {
  if (isDirectPercentage.value) {
    return props.directPercentage;
  } else {
    return (props.processedFileCount / props.fileCountAll) * 100;
  }
});
const percentageForDisplay = computed<string>(
  () => `${Math.floor(percentage.value)}%`
);
const stylePercentage = computed<string>(() => `width: ${percentage.value}%`);
</script>
