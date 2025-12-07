import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SearchOverlay from './components/SearchOverlay';
import LocationHeader from './components/LocationHeader';
import WeatherSection from './components/WeatherSection';
import CountryInfoSection from './components/CountryInfoSection';
import TravelAdvisorySection from './components/TravelAdvisorySection';
import ExchangeRateSection from './components/ExchangeRateSection';
import AttractionsSection from './components/AttractionsSection';
import HotelsSection from './components/HotelsSection';

const TravelDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [particles, setParticles] = useState([]);
  const [loadingStage, setLoadingStage] = useState(0);

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Apply theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const loadingMessages = [
    "Contacting local guides...",
    "Scanning weather radars...",
    "Checking exchange rates...",
    "Locating best hotels...",
    "Mapping tourist attractions..."
  ];

  useEffect(() => {
    let interval;
    if (isSearching) {
      setLoadingStage(0);
      interval = setInterval(() => {
        setLoadingStage((prev) => (prev + 1) % loadingMessages.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20
    }));
    setParticles(newParticles);
  }, []);



  // Implementing caching for travel advisories
  const CACHE_KEY_ADVISORIES = 'travel_advisories_cache';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      console.log('Starting search for:', searchQuery);

      // Geocode the location
      const geocodeRes = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchQuery)}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
      );

      if (!geocodeRes.ok) {
        throw new Error(`Geocoding failed: ${geocodeRes.status}`);
      }

      const geocodeData = await geocodeRes.json();
      console.log('Geocode response:', geocodeData);

      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error('Location not found. Please try a different search term.');
      }

      const location = geocodeData.results[0];
      const { lat, lng } = location.geometry;
      const countryCode = location.components['ISO_3166-1_alpha-2'];
      // Use country from geocoding for immediate advisory fetch
      const countryNameForAdvisory = location.components.country || searchQuery;

      console.log('Location found:', location.formatted);
      console.log('Coordinates:', lat, lng);
      console.log('Country code:', countryCode);

      // Fetch all data in parallel
      const [weatherData, countryData, exchangeRate, attractions, hotelData, travelAdvisory] = await Promise.all([
        fetchWeather(lat, lng),
        fetchCountryData(countryCode),
        fetchExchangeRate(countryCode),
        fetchAttractions(lat, lng, searchQuery),
        fetchHotels(searchQuery, lat, lng),
        fetchTravelAdvisory(countryCode, countryNameForAdvisory)
      ]);

      setData({
        location: location.formatted,
        coordinates: { lat, lng },
        weather: weatherData,
        country: countryData,
        advisory: travelAdvisory,
        exchange: exchangeRate,
        attractions: attractions,
        hotels: hotelData,
        countryCode: countryCode
      });

      setShowResults(true);
    } catch (err) {
      setError(err.message || 'Failed to fetch data. Please try again.');
      console.error('Error details:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch weather data
  const fetchWeather = async (lat, lng) => {
    try {
      console.log('Fetching weather...');
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!currentRes.ok) throw new Error('Weather API failed');
      const current = await currentRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!forecastRes.ok) throw new Error('Forecast API failed');
      const forecast = await forecastRes.json();

      console.log('Weather data fetched successfully');
      return { current, forecast: forecast.list.slice(0, 8) };
    } catch (err) {
      console.error('Weather fetch error:', err);
      throw err;
    }
  };

  // Fetch country data
  const fetchCountryData = async (countryCode) => {
    try {
      console.log('Fetching country data for:', countryCode);
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      if (!res.ok) throw new Error('Country data API failed');
      const data = await res.json();
      console.log('Country data fetched successfully');
      return data[0];
    } catch (err) {
      console.error('Country data fetch error:', err);
      throw err;
    }
  };

  // Fetch travel advisory
  const fetchTravelAdvisory = async (countryCode, countryName) => {
    try {
      console.log('Fetching travel advisory for:', countryCode, countryName);

      let data = null;

      // Check Cache
      const cached = localStorage.getItem(CACHE_KEY_ADVISORIES);
      if (cached) {
        try {
          const { timestamp, data: cachedData } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            console.log('Using cached travel advisories');
            data = cachedData;
          } else {
            console.log('Cache expired');
          }
        } catch (e) {
          console.error('Cache parse error', e);
        }
      }

      // Fetch if not cached
      if (!data) {
        // Using local Vite proxy to avoid CORS issues
        const advisoryUrl = `/api/cadata/TravelAdvisories`;
        const res = await fetch(advisoryUrl);

        if (res.ok) {
          data = await res.json();
          // Save to cache
          try {
            localStorage.setItem(CACHE_KEY_ADVISORIES, JSON.stringify({
              timestamp: Date.now(),
              data: data
            }));
            console.log('Travel advisories cached');
          } catch (e) {
            console.error('Failed to cache advisories', e);
          }
        }
      }

      if (data) {
        console.log('State Dept response available, items:', data.length);

        const countryLower = countryName?.toLowerCase() || '';

        // Find the matching advisory object
        const advisory = data.find(item => {
          const title = item.Title?.toLowerCase() || '';
          return title.startsWith(countryLower) || title.includes(' ' + countryLower + ' ');
        });

        if (advisory) {
          console.log('Found advisory for:', advisory.Title);

          // Extract Level
          const title = advisory.Title || '';
          let level = 1;
          if (title.includes('Level 4')) level = 4;
          else if (title.includes('Level 3')) level = 3;
          else if (title.includes('Level 2')) level = 2;

          // Extract Message/Text
          const messages = {
            4: { short: 'Do Not Travel', full: 'Avoid all travel to this destination due to serious safety risks.' },
            3: { short: 'Reconsider Travel', full: 'Serious risks are present. Reconsider your travel plans.' },
            2: { short: 'Exercise Increased Caution', full: 'Be aware of heightened risks and take extra precautions.' },
            1: { short: 'Exercise Normal Precautions', full: 'Standard safety awareness recommended.' }
          };

          // Clean Summary (remove HTML)
          let summary = advisory.Summary || '';
          if (summary) {
            // Remove HTML tags
            summary = summary.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            // Take the first reasonable chunk if it's too long
            if (summary.length > 300) {
              // Try to split by sentence
              const sentences = summary.match(/[^.!?]+[.!?]/g);
              if (sentences && sentences.length > 0) {
                summary = sentences[0];
                if (summary.length < 50 && sentences.length > 1) summary += ' ' + sentences[1];
              }

              if (summary.length > 300) {
                summary = summary.substring(0, 297) + '...';
              }
            }
          } else {
            summary = messages[level].full;
          }

          return {
            score: level,
            level: level,
            levelText: messages[level].short,
            message: messages[level].full,
            summary: summary,
            source: 'US Department of State',
            link: advisory.Link || 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html'
          };
        }

        // If country not found in API response
        console.log('Country not found in advisories list');
        return {
          score: 0,
          level: 0,
          levelText: 'Not Available',
          message: 'Advisory data not available for this country.',
          summary: `No specific travel advisory found for ${countryName}.`,
          source: 'US Department of State',
          link: `https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html`
        };
      }

      // If API call failed or data null
      return {
        score: 0,
        level: 0,
        levelText: 'Unavailable',
        message: 'Unable to fetch travel advisory',
        summary: 'Travel advisory service is temporarily unavailable.',
        source: 'US Department of State',
        link: `https://travel.state.gov`
      };
    } catch (err) {
      console.error('Travel advisory fetch error:', err);
      // Fallback to safe default on error
      return {
        score: 0,
        level: 0,
        levelText: 'Unavailable',
        message: 'Travel advisory service unavailable',
        summary: 'Unable to retrieve travel advisory. Please check the official website.',
        link: `https://travel.state.gov`
      };
    }
  };

  // Fetch exchange rate
  const fetchExchangeRate = async (countryCode) => {
    try {
      console.log('Fetching exchange rates...');
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      if (!res.ok) throw new Error('Exchange rate API failed');
      const data = await res.json();
      console.log('Exchange rates fetched successfully');
      return data.rates || {};
    } catch (err) {
      console.error('Exchange rate fetch error:', err);
      return {};
    }
  };

  // Fetch attractions
  const fetchAttractions = async (lat, lng, query) => {
    try {
      console.log('Fetching attractions with OpenStreetMap Overpass API...');

      // Using Overpass API to get tourist attractions from OpenStreetMap
      const radius = 5000; // 5km radius
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["tourism"~"attraction|museum|artwork|viewpoint|theme_park|zoo|aquarium"](around:${radius},${lat},${lng});
          way["tourism"~"attraction|museum|artwork|viewpoint|theme_park|zoo|aquarium"](around:${radius},${lat},${lng});
          node["historic"~"monument|memorial|castle|ruins|archaeological_site"](around:${radius},${lat},${lng});
          way["historic"~"monument|memorial|castle|ruins|archaeological_site"](around:${radius},${lat},${lng});
          node["leisure"~"park|garden"](around:${radius},${lat},${lng})["name"];
        );
        out center 15;
      `;

      const res = await fetch(
        'https://overpass-api.de/api/interpreter',
        {
          method: 'POST',
          body: `data=${encodeURIComponent(overpassQuery)}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (!res.ok) {
        console.error('Overpass API error:', res.status);
        return [];
      }

      const data = await res.json();
      console.log('Attractions fetched successfully:', data.elements?.length || 0);

      // Transform Overpass API response and fetch images
      const attractionsRaw = (data.elements || [])
        .filter(el => el.tags && el.tags.name)
        .slice(0, 10);

      // Fetch images from Wikimedia Commons for each attraction
      const attractionsWithImages = await Promise.all(
        attractionsRaw.map(async (el, index) => {
          let imageUrl = null;

          // Try to get image from wikimedia_commons tag
          if (el.tags.wikimedia_commons) {
            const commonsFile = el.tags.wikimedia_commons.replace('File:', '');
            imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(commonsFile)}?width=400`;
          }
          // Try to get image from wikidata
          else if (el.tags.wikidata) {
            try {
              const wdRes = await fetch(
                `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${el.tags.wikidata}&property=P18&format=json&origin=*`
              );
              if (wdRes.ok) {
                const wdData = await wdRes.json();
                const imageClaim = wdData.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
                if (imageClaim) {
                  imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageClaim)}?width=400`;
                }
              }
            } catch (e) {
              console.log('Wikidata image fetch failed for:', el.tags.name);
            }
          }

          // Fallback: Try geosearch on Wikimedia Commons
          if (!imageUrl && el.lat && el.lon) {
            try {
              const geoRes = await fetch(
                `https://commons.wikimedia.org/w/api.php?action=query&list=geosearch&gscoord=${el.lat || el.center?.lat}|${el.lon || el.center?.lon}&gsradius=500&gslimit=1&gsprop=type&format=json&origin=*`
              );
              if (geoRes.ok) {
                const geoData = await geoRes.json();
                const page = geoData.query?.geosearch?.[0];
                if (page?.pageid) {
                  const imgRes = await fetch(
                    `https://commons.wikimedia.org/w/api.php?action=query&pageids=${page.pageid}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json&origin=*`
                  );
                  if (imgRes.ok) {
                    const imgData = await imgRes.json();
                    imageUrl = imgData.query?.pages?.[page.pageid]?.imageinfo?.[0]?.thumburl;
                  }
                }
              }
            } catch (e) {
              console.log('Geosearch image fetch failed for:', el.tags.name);
            }
          }

          return {
            fsq_id: el.id?.toString() || `osm_${index}`,
            name: el.tags.name,
            location: {
              address: el.tags['addr:street']
                ? `${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}`.trim()
                : (el.tags['addr:city'] || 'See on map'),
              lat: el.lat || el.center?.lat,
              lon: el.lon || el.center?.lon
            },
            categories: [{
              name: el.tags.tourism || el.tags.historic || el.tags.leisure || 'Point of Interest'
            }],
            image: imageUrl
          };
        })
      );

      return attractionsWithImages;
    } catch (err) {
      console.error('Attractions fetch error:', err);
      return [];
    }
  };

  // Fetch hotels
  const fetchHotels = async (location, lat, lng) => {
    try {
      console.log('Fetching hotels with Booking.com properties...');

      const delta = 0.05; // roughly 5km radius
      const bbox = `${(lat - delta).toFixed(6)},${(lat + delta).toFixed(6)},${(lng - delta).toFixed(6)},${(lng + delta).toFixed(6)}`;

      // Calculate dates (check-in day after tomorrow, check-out 2 days later)
      const today = new Date();
      const checkinDate = new Date(today);
      checkinDate.setDate(today.getDate() + 2);
      const checkoutDate = new Date(today);
      checkoutDate.setDate(today.getDate() + 4);
      const formatDate = (date) => date.toISOString().split('T')[0];

      // EXACT API from user's RapidAPI workspace
      const apiUrl = `https://apidojo-booking-v1.p.rapidapi.com/properties/list-by-map?` +
        `arrival_date=${formatDate(checkinDate)}` +
        `&departure_date=${formatDate(checkoutDate)}` +
        `&room_qty=1` +
        `&guest_qty=1` +
        `&bbox=${encodeURIComponent(bbox)}` +
        `&search_id=none` +
        `&price_filter_currencycode=USD` +
        `&languagecode=en-us` +
        `&travel_purpose=leisure` +
        `&order_by=popularity` +
        `&offset=0`;

      console.log('Booking.com API URL:', apiUrl);

      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
      });

      console.log('Booking.com API status:', res.status);

      if (!res.ok) {
        const errText = await res.text();
        console.error('Booking.com API error:', res.status, errText);
        return [];
      }

      const data = await res.json();
      console.log('Hotels API response:', data);

      // Handle the response structure from properties/list-by-map
      const hotelResults = data.result || data.hotels || data || [];
      if (!Array.isArray(hotelResults) || hotelResults.length === 0) {
        console.log('No hotels found in response');
        return [];
      }

      // Transform response
      const hotels = hotelResults.slice(0, 6).map((hotel, index) => {
        // Get the best available image URL and upgrade quality
        let imageUrl = hotel.max_photo_url || hotel.main_photo_url || hotel.photo || null;

        // Booking.com images often have size in URL like 'square60' - replace with larger size
        if (imageUrl) {
          imageUrl = imageUrl
            .replace(/square\d+/, 'square500')      // Replace square60, square80, etc with square500
            .replace(/max\d+/, 'max800')            // Replace max300, max400 with max800
            .replace(/\/\d+x\d+\//, '/800x600/')    // Replace dimension patterns like /180x180/ with /800x600/
            .replace('_square60', '_square500')     // Alternative format
            .replace('_max300', '_max800');         // Alternative format
        }

        return {
          hotel_id: hotel.hotel_id?.toString() || hotel.id?.toString() || `booking_${index}`,
          hotel_name: hotel.hotel_name || hotel.hotel_name_trans || hotel.name || 'Hotel',
          address: hotel.address || hotel.city_trans || hotel.city || 'See on Booking.com',
          review_score: hotel.review_score || null,
          review_word: hotel.review_score_word || null,
          accommodation_type: hotel.accommodation_type_name || hotel.unit_configuration_label || 'Hotel',
          image: imageUrl,
          price: hotel.min_total_price || hotel.price_breakdown?.gross_price || hotel.composite_price_breakdown?.gross_amount_per_night?.value || null,
          currency: hotel.currency_code || hotel.currencycode || 'USD',
          booking_url: hotel.url || `https://www.booking.com/hotel/${hotel.hotel_id || hotel.id}.html`
        };
      });

      console.log('Processed hotels:', hotels.length);
      return hotels;
    } catch (err) {
      console.error('Hotels fetch error:', err);
      return [];
    }
  };

  if (!showResults) {
    return (
      <LandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        particles={particles}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isSearching={isSearching}
        error={error}
        loadingMessages={loadingMessages}
        loadingStage={loadingStage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950 transition-colors duration-500">
      <Header theme={theme} toggleTheme={toggleTheme} setShowResults={setShowResults} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <LocationHeader data={data} />

        <WeatherSection weather={data.weather} />

        <CountryInfoSection country={data.country} />

        <TravelAdvisorySection advisory={data.advisory} />

        <ExchangeRateSection exchange={data.exchange} country={data.country} />

        <AttractionsSection attractions={data.attractions} />

        <HotelsSection hotels={data.hotels} />
      </div>

    </div>
  );
};

export default TravelDashboard;