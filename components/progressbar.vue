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
  <div class="text-center">
    <div class="text-2xl">
      撮影時刻取得中... {{ processedFileCount }} / {{ fileCountAll }}
    </div>
  </div>
</template>

<script setup lang="ts">
type PropType = {
  fileCountAll: number;
  processedFileCount: number;
};
const props = withDefaults(defineProps<PropType>(), {
  fileCountAll: 100,
  processedFileCount: 1,
});

const percentage = computed<number>(
  () => (props.processedFileCount / props.fileCountAll) * 100
);
const percentageForDisplay = computed<string>(
  () => `${Math.floor(percentage.value)}%`
);
const stylePercentage = computed<string>(() => `width: ${percentage.value}%`);
</script>
