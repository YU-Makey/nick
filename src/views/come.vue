<template>
  <div>欢迎来到积云后台管理系统</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped></style>