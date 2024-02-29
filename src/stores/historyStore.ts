import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IHistoryElement } from '@/interfaces/IHistoryElement';

export const useHistoryStore = defineStore('statistics', () => {
  const history = ref<IHistoryElement[] | null>(null);
  const allVideosCount = ref<number | null>(null);
  const selectedChannel = ref<string | null>(null);

  function setHistory(h: any[]) {
    history.value = h;
  }

  function setAllVideosCount(count: number) {
    allVideosCount.value = count;
  }

  function setSelectedChannel(channel: string) {
    selectedChannel.value = channel;
  }

  return { history, selectedChannel, setSelectedChannel, setHistory, allVideosCount, setAllVideosCount };
});
