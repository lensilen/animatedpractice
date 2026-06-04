import AsyncStorage from '@react-native-async-storage/async-storage';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export const QUOTE_TASK_NAME = 'fetch-random-quote-task';
export const QUOTE_STORAGE_KEY = 'last-random-quote';

async function fetchQuote() {
  const response = await fetch('https://api.quotable.io/random');

  if (!response.ok) {
    throw new Error('Gagal mengambil quote');
  }

  const data = await response.json();
  return { content: data.content, author: data.author };
}

export async function fetchAndSaveQuote() {
  const quote = await fetchQuote();
  await AsyncStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quote));
  return quote;
}

TaskManager.defineTask(QUOTE_TASK_NAME, async () => {
  try {
    await fetchAndSaveQuote();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerQuoteBackgroundTask() {
  const status = await BackgroundFetch.getStatusAsync();

  if (status !== BackgroundFetch.BackgroundFetchStatus.Available) {
    return { message: 'Background fetch tidak tersedia di perangkat ini.' };
  }

  const isRegistered = await TaskManager.isTaskRegisteredAsync(QUOTE_TASK_NAME);

  if (!isRegistered) {
    await BackgroundFetch.registerTaskAsync(QUOTE_TASK_NAME, {
      minimumInterval: 15 * 60,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  }

  return { message: 'Background task sudah aktif.' };
}

export async function loadStoredQuote() {
  const stored = await AsyncStorage.getItem(QUOTE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}
