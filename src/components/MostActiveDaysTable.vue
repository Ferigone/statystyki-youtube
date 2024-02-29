<script setup lang="ts">
import { computed } from 'vue';
import { useHistoryStore } from '@/stores/historyStore';
import { filterVideosFromHistory, groupByDay } from '@/utils';
import TableComponent from '@/components/TableComponent.vue';
import dayjs from 'dayjs';

const historyStore = useHistoryStore();
const history = computed(() => {
  return historyStore.selectedChannel
    ? filterVideosFromHistory(historyStore.history || [], historyStore.selectedChannel)
    : historyStore.history;
});

const grouped = computed(() => groupByDay(history.value || []).slice(0, 10));

const data = computed(() => {
  return grouped.value.map((items) => {
    return {
      cells: [
        {
          value: dayjs(items.day).format('dddd, D MMMM YYYY'),
          isBold: false
        },
        {
          value: items.count,
          isBold: true
        }
      ]
    };
  });
});
</script>

<template>
  <TableComponent :data="data" :labels="['Dzień', 'Ilość filmów']" title="Top 10 aktywnych dni" />
</template>
