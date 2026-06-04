import { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AnimatedCard from './components/AnimatedCard';
import SwipeableListItem from './components/SwipeableListItem';
import {
  fetchAndSaveQuote,
  loadStoredQuote,
  registerQuoteBackgroundTask,
} from './services/quoteTask';

const initialItems = [
  { id: '1', title: 'Animated API' },
  { id: '2', title: 'Gesture Handler' },
  { id: '3', title: 'Background Task' },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState('Menyiapkan background task...');

  useEffect(() => {
    async function prepare() {
      try {
        setQuote(await loadStoredQuote());
        const result = await registerQuoteBackgroundTask();
        setMessage(result.message);
      } catch (error) {
        setMessage('Background task gagal disiapkan.');
      }
    }

    prepare();
  }, []);

  const handleDelete = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const refreshQuoteNow = async () => {
    try {
      setMessage('Mengambil quote terbaru...');
      setQuote(await fetchAndSaveQuote());
      setMessage('Quote berhasil disimpan.');
    } catch (error) {
      setMessage('Gagal mengambil quote terbaru.');
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Latihan & Evaluasi Mandiri</Text>

          <AnimatedCard
            title="AnimatedCard"
            subtitle="Tap untuk bounce dan long press untuk berputar."
          />

          <Text style={styles.sectionTitle}>SwipeableListItem</Text>
          {items.map((item) => (
            <SwipeableListItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}

          <Text style={styles.sectionTitle}>Background Quote Task</Text>
          <Text style={styles.body}>{message}</Text>
          <Text style={styles.quote}>
            {quote ? `"${quote.content}" - ${quote.author}` : 'Belum ada quote tersimpan.'}
          </Text>
          <Pressable style={styles.button} onPress={refreshQuoteNow}>
            <Text style={styles.buttonText}>Fetch Quote Sekarang</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '900',
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '900',
  },
  body: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
  },
  quote: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d7dee8',
    color: '#111827',
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
