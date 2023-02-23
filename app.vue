<template>
  <div class="relative p-10 n-bg-base">
    <div class="flex justify-between items-center">
      <div class="text-2xl">ファイル名変更</div>
    </div>
    <NTip class="my-4">
      写真の撮影時刻をファイル名の先頭に付け加えます。 <br />
      例: 2022年12月23日 12時23分45秒に撮影した 「浜辺.jpg」 ->
      「20221223-122345__浜辺.jpg」
    </NTip>
    <Loading v-if="renaming" />
    <NCard
      v-else
      class="p-10 text-center"
      :class="isDragging ? 'border-orange' : ''"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent="isDragging = true"
      @drop.prevent="onDrop"
    >
      <p>
        {{ msg1 }}
      </p>
      <NButton v-if="!isDragging" class="uploadButton" for="fileInput">
        ここをクリックして選択
        <input
          id="fileInput"
          class="uploadButtonInput"
          type="file"
          multiple
          @change="onDrop"
        />
      </NButton>
    </NCard>
    <NTip
      v-if="isError"
      class="mt-4"
      n="red6 dark:red5"
      icon="carbon:warning-alt"
    >
      エラーが発生しました。やり直してください。
    </NTip>
  </div>
</template>

<style lang="scss" scoped>
.uploadButton {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.uploadButtonInput {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
</style>

<script setup lang="ts">
import { getCreatedDateTimeFromExif } from "@/modules/exifProcessor";
import JSZip from "jszip";
import FileSaver from "file-saver";

const isDragging = ref<Boolean>(false);
const renaming = ref<Boolean>(false);
const isError = ref<Boolean>(false);

const msg1 = computed<String>(() => {
  return isDragging.value
    ? "ここにドロップしてください"
    : "ここにファイルをドロップ。または";
});

type FileInfo = {
  name: string;
  blob: ArrayBuffer;
};

const onDrop = (event: Event) => {
  isError.value = false;
  isDragging.value = false;
  renaming.value = true;
  // @ts-ignore
  const fileList: File[] = event.target.files
    ? event.target.files
    : event.dataTransfer.files;

  if (fileList.length === 0) {
    isDragging.value = false;
    renaming.value = false;
    isError.value = true;
    return;
  }

  let fileCount = 0;
  const fileToNewFilename: { [key: string]: FileInfo } = {};

  for (const f of fileList) {
    const reader = new FileReader();
    reader.onload = async () => {
      const ab = reader.result as ArrayBuffer;
      const dateTime = getCreatedDateTimeFromExif(ab);
      const prefix = dateTime.length === 0 ? "" : `${dateTime}__`;
      fileToNewFilename[f.name] = {
        name: prefix + f.name,
        blob: ab,
      };
    };
    reader.readAsArrayBuffer(f);
  }

  // すべて読み込んだか 0.5 秒ごとにチェック
  const checkProcess = setInterval(() => {
    const newCount = Object.keys(fileToNewFilename).length;
    if (fileCount !== newCount) {
      fileCount = newCount;
      console.log(fileToNewFilename);
    } else {
      const zip = new JSZip();
      for (const key of Object.keys(fileToNewFilename)) {
        const value = fileToNewFilename[key];
        zip.file(value.name, value.blob, {
          binary: true,
        });
      }
      zip
        .generateAsync({
          type: "blob",
        })
        .then((content) => {
          FileSaver.saveAs(content, "irt-download.zip");
          renaming.value = false;
        });
      clearInterval(checkProcess);
    }
  }, 500);
};
</script>
