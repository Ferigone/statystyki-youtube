import type { IHistoryElement } from '@/interfaces/IHistoryElement';
import dayjs from 'dayjs';

export const filterVideosFromHistory = (history: IHistoryElement[], channelName?: string): IHistoryElement[] => {
  return history.filter((element) => element.subtitles[0]?.name === channelName);
};

export const filterVideosWithChannelNames = (history: any[]): IHistoryElement[] => {
  return history.filter((element: any | IHistoryElement) => {
    return !!(
      element.header &&
      element.title &&
      element.titleUrl &&
      element.subtitles &&
      element.subtitles.length > 0 &&
      element.time &&
      element.products &&
      element.activityControls
    );
  });
};

const fixTitle = (title: string): string => title.startsWith('Watched ') ? title.slice('Watched '.length) : title;

export const groupByTitles = (history: IHistoryElement[]): { title: string; count: number; link: string }[] => {
  const titleMap = new Map<string, { count: number; link: string }>();
  history.forEach(({ title, titleUrl }) => {
    const fixedTitle = fixTitle(title);
    const existing = titleMap.get(fixedTitle);
    if (existing) {
      existing.count++;
    } else {
      titleMap.set(fixedTitle, { count: 1, link: titleUrl });
    }
  });

  return Array.from(titleMap, ([title, { count, link }]) => ({ title, count, link })).sort((a, b) => b.count - a.count);
};

export const groupByDayOfTheWeek = (history: IHistoryElement[]): { day: string; day_number: number; count: number }[] => {
  const dayMap = new Map<string, { day_number: number; count: number }>();
  history.forEach((element) => {
    const day = dayjs(element.time).format('dddd');
    const day_number = dayjs(element.time).day() !== 0 ? dayjs(element.time).day() : 7;
    const existing = dayMap.get(day);
    if (existing) {
      existing.count++;
    } else {
      dayMap.set(day, { day_number, count: 1 });
    }
  });

  return Array.from(dayMap, ([day, { day_number, count }]) => ({ day, day_number, count })).sort((a, b) => a.day_number - b.day_number);
};

export const groupByDay = (history: IHistoryElement[]): { day: string; count: number }[] => {
  const dayMap = new Map<string, number>();
  history.forEach((element) => {
    const day = dayjs(element.time).format('YYYY-MM-DD');
    const existing = dayMap.get(day);
    if (existing !== undefined) {
      dayMap.set(day, existing + 1);
    } else {
      dayMap.set(day, 1);
    }
  });

  return Array.from(dayMap, ([day, count]) => ({ day, count })).sort((a, b) => b.count - a.count);
};

export const channelList = (history: IHistoryElement[]): string[] => {
  const channels = new Set<string>();
  history.forEach((element) => {
    element.subtitles.forEach((subtitle) => {
      channels.add(subtitle.name);
    });
  });

  return Array.from(channels);
};

export const getPercentageOfAllVideos = (count: number, allVideosCount: number): number => {
  return Math.round(((count / allVideosCount) * 100) * 1000) / 1000;
};
