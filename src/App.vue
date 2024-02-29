<script setup lang="ts">
import { useHistoryStore } from '@/stores/historyStore';
import FileComponent from '@/components/FileComponent.vue';
import StatisticsComponent from '@/components/StatisticsComponent.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import { SpeedInsights } from '@vercel/speed-insights/vue';
import { inject } from '@vercel/analytics';

inject();

dayjs.locale('pl');
const historyStore = useHistoryStore();
</script>

<template>
  <SpeedInsights />

  <main class="flex flex-col items-center justify-center min-h-svh py-12 px-4">
    <FileComponent v-if="!historyStore.history" />
    <StatisticsComponent v-else />
  </main>
</template>
