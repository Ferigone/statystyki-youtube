<script setup lang="ts">
import { groupByDayOfTheWeek, filterVideosFromHistory } from '@/utils';
import { useHistoryStore } from '@/stores/historyStore';
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const historyStore = useHistoryStore();
const history = computed(() => {
  return historyStore.selectedChannel
    ? filterVideosFromHistory(historyStore.history || [], historyStore.selectedChannel)
    : historyStore.history;
});

const groupedHistory = computed(() => groupByDayOfTheWeek(history.value || []));
const labels = computed(() => groupedHistory.value.map((item) => item.day));
const dataSet = computed(() => groupedHistory.value.map((item) => item.count));

const data = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Liczba wyświetleń w danym dniu tygodnia',
      data: dataSet.value,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
}));
</script>

<template>
  <div>
    <h2 class="text-center">Liczba wyświetleń rozłożona na dni tygodnia</h2>
    <Bar :data="data" />
  </div>
</template>
