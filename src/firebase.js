import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDyzIuow1wVwnysfY2WHGUeBhKBGDXVZuc",
  authDomain: "ultimate-analytics-9d0be.firebaseapp.com",
  projectId: "ultimate-analytics-9d0be",
  storageBucket: "ultimate-analytics-9d0be.firebasestorage.app",
  messagingSenderId: "108249184507",
  appId: "1:108249184507:web:d4653164cec30c6fecd85e",
  measurementId: "G-85NGN7TB3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Store user IP for analytics
let userIP = '';
let userCity = '';
let userCountry = '';

// Fetch user IP and location data
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    userIP = data.ip;
    // Get location data
    return fetch(`https://ipapi.co/${data.ip}/json/`);
  })
  .then(response => response.json())
  .then(data => {
    userCity = data.city;
    userCountry = data.country_name;
    // Set user properties in Firebase
    setUserProperties(analytics, {
      user_ip: userIP,
      user_city: userCity,
      user_country: userCountry
    });
  })
  .catch(error => console.error('Error fetching IP/location:', error));

// Analytics event logger with app prefix and user data
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  const prefixedEventName = `growfitter_${eventName}`;
  logEvent(analytics, prefixedEventName, {
    ...eventParams,
    app_name: 'growfitter',
    timestamp: new Date().toISOString(),
    user_ip: userIP,
    user_city: userCity,
    user_country: userCountry
  });
};

export default analytics;
