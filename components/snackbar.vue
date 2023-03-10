<script setup lang="ts">
type PropType = {
  modelValue: boolean;
  label: string;
  durationMs?: number;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<PropType>(), {
  modelValue: false,
  label: "Snackbar",
  durationMs: 3000,
})

const valueInner = toRef(props, 'modelValue')

watch(valueInner, (newValue, oldValue) => {
  if (oldValue === false && newValue === true) {
    emit('update:modelValue', true)
    setTimeout(() => {
      emit('update:modelValue', false)
    }, props.durationMs)
  }
})
</script>

<template>
  <Transition>
    <div v-if="valueInner" class="snackbar bg-green-600 box-shadow-2xl drop-shadow-2xl rounded-2xl p-4 mt-10 text-white w-max">
      {{ props.label }}
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.snackbar {
  position: sticky;
  top: 0;
  left: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
