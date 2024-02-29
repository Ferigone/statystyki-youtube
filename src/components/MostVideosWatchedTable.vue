<script setup lang="ts">
import { computed} from 'vue';
import { filterVideosFromHistory, groupByTitles } from '@/utils';
import { useHistoryStore } from '@/stores/historyStore';
import TableComponent from '@/components/TableComponent.vue';

const historyStore = useHistoryStore();
const history = computed(() => {
  return historyStore.selectedChannel
    ? filterVideosFromHistory(historyStore.history || [], historyStore.selectedChannel)
    : historyStore.history;
});

const grouped = computed(() => {
  const historyValue = history.value || [];
  return groupByTitles(historyValue).slice(0, 10);
});

const data = computed(() => {
  return grouped.value.map((items) => {
    return {
      cells: [
        {
          value: items.title,
          isBold: false,
          link: items.link
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
  <TableComponent :data="data" :labels="['Tytuł', 'Liczba wyświetleń']" title="Top 10 filmów" />
</template>
