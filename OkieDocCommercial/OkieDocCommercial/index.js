import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

let App;
try {
	// Require App at runtime so we can catch import-time errors and surface them
	// as a clear message instead of failing silently before registering the app.
	App = require('./App').default;
} catch (e) {
	// Log error to Metro / device console for easier debugging
	// Provide a minimal fallback component so the app still registers.
	// eslint-disable-next-line no-console
	console.error('Error importing ./App:', e);

	const React = require('react');
	const { View, Text, StyleSheet } = require('react-native');

	const Fallback = () => (
		React.createElement(View, { style: styles.container }, React.createElement(Text, { style: styles.text }, 'App import error: ' + (e?.message || String(e))))
	);

	const styles = StyleSheet.create({
		container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
		text: { color: '#b00020', textAlign: 'center' },
	});

	registerRootComponent(Fallback);
	throw e; // rethrow so Metro shows the full stack
}

registerRootComponent(App);
