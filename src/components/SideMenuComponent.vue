<script setup lang="ts">
import { ref } from 'vue';
import { channelList } from '@/utils';
import { useHistoryStore } from '@/stores/historyStore';

const historyStore = useHistoryStore();
let channels = ref(channelList(historyStore.history || []));

const handleSearchChannel = (event: Event) => {
  const searchValue = (event.target as HTMLInputElement).value;
  channels.value = channelList(historyStore.history || []).filter((channel) =>
    channel.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const handleChannelChange = (channel: string) => {
  if (channel === historyStore.selectedChannel) {
    historyStore.setSelectedChannel('');
    return;
  }
  historyStore.setSelectedChannel(channel);
};
</script>

<template>
  <div class="w-1/4 pb-16">
    <div class="w-1/4 p-4 fixed max-h-screen top-0 pb-6">
      <h2 class="mb-4 font-black">Lista kanałów</h2>
      <input
        type="text"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        placeholder="Wyszukaj kanał..."
        @input="handleSearchChannel"
      />
      <ul class="overflow-y-auto mt-4">
        <li
          v-for="channel in channels"
          :key="channel"
          @click="handleChannelChange(channel)"
          :class="{
            'bg-gray-200': historyStore.selectedChannel === channel
          }"
          class="cursor-pointer hover:bg-gray-200 p-2 gap-4 rounded flex flex-row justify-between items-center mb-2"
        >
          <span>
            {{ channel }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
