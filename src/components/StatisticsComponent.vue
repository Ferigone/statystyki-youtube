<script setup lang="ts">
import { filterVideosFromHistory, getPercentageOfAllVideos, groupByTitles } from '@/utils';
import { useHistoryStore } from '@/stores/historyStore';
import { computed } from 'vue';
import DayOfTheWeekChart from '@/components/DayOfTheWeekChart.vue';
import MostVideosWatchedTable from '@/components/MostVideosWatchedTable.vue';
import MostActiveDaysTable from '@/components/MostActiveDaysTable.vue';
import SideMenuComponent from '@/components/SideMenuComponent.vue';

const historyStore = useHistoryStore();
const history = computed(() => {
  return historyStore.selectedChannel
    ? filterVideosFromHistory(historyStore.history || [], historyStore.selectedChannel)
    : historyStore.history;
});

</script>

<template>
  <div class="flex flex-row w-full">
    <SideMenuComponent />
    <div class="prose max-w-none mb-16 mt-4 w-3/4">
      <div>
        <h1 class="text-center text-4xl font-black mb-8">Statystyki YouTube</h1>
        <h2 class="text-center text-3xl my-4 font-black">
            Wszystkie filmy: <i>{{ history ? history.length : 0 }}</i>
        </h2>
        <h2 class="text-center text-3xl my-6 font-black">
          Unikalnych filmów:
          <i>{{ history ? groupByTitles(history).length : 0 }}</i>
        </h2>


        <h3 class="text-center text-2xl" v-if="historyStore.selectedChannel">
          <span>Procent filmów <strong>{{ historyStore.selectedChannel }}</strong> wśród wszystkich filmów: </span>
          <span class="italic"
            >{{
              historyStore.allVideosCount
                ? getPercentageOfAllVideos(history?.length ?? 0, historyStore.allVideosCount)
                : 0
            }}%
          </span>
        </h3>
      </div>

      <MostVideosWatchedTable />

      <MostActiveDaysTable />

      <div class="mt-12">
        <DayOfTheWeekChart />
      </div>
    </div>
  </div>
</template>
