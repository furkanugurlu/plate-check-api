# Quick Start Guide

## Start the Server

```bash
cd api
npm start
```

Server will run on: **http://localhost:3001**

---

## Test Commands

### 1. Health Check
```bash
curl http://localhost:3001/health
```

**Expected Response:**
```json
{"status":"ok"}
```

---

### 2. Get Daily Plates (Simple)
```bash
curl http://localhost:3001/api/plates/daily
```

---

### 3. Get Daily Plates (Formatted)
```bash
curl -s http://localhost:3001/api/plates/daily | json_pp
```

---

### 4. Get Plate Count
```bash
curl -s http://localhost:3001/api/plates/daily | node -e "const data = JSON.parse(require('fs').readFileSync(0, 'utf-8')); console.log('Total plates:', data.count);"
```

---

### 5. Get First 10 Plates
```bash
curl -s http://localhost:3001/api/plates/daily | node -e "const data = JSON.parse(require('fs').readFileSync(0, 'utf-8')); console.log(data.plates.slice(0, 10));"
```

---

### 6. Test from React Native

```javascript
// In your React Native app
const API_URL = 'http://localhost:3001';

const fetchDailyPlates = async () => {
  try {
    const response = await fetch(`${API_URL}/api/plates/daily`);
    const data = await response.json();
    
    console.log(`✅ Loaded ${data.count} plates`);
    console.log('Sample plates:', data.plates.slice(0, 5));
    
    return data.plates;
  } catch (error) {
    console.error('❌ Error fetching plates:', error);
    throw error;
  }
};

// Usage
fetchDailyPlates()
  .then(plates => {
    // Use plates in your app
    console.log('Ready to use', plates.length, 'plates');
  });
```

---

### 7. Test Latency

```bash
time curl -s http://localhost:3001/api/plates/daily > /dev/null
```

Should take approximately **500ms** (simulated latency).

---

## Expected Response Format

```json
{
  "plates": [
    "06 ARS 06",
    "11 BRK 430",
    "34 ABC 123",
    "35 JYA 869",
    ...
  ],
  "count": 3000,
  "timestamp": "2026-02-05T10:07:20.123Z"
}
```

---

## Plate Format Examples

✅ Valid formats:
- `34 ABC 123` (2 digits, 3 letters, 3 digits)
- `06 ARS 06` (2 digits, 3 letters, 2 digits)
- `35 JY 869` (2 digits, 2 letters, 3 digits)
- `01 BR 43` (2 digits, 2 letters, 2 digits)

❌ Invalid (won't be generated):
- Letters Q, W, X are excluded
- City codes outside 01-81
- Single digit numbers

---

## Development Mode

For auto-reload during development:

```bash
npm run dev
```

Uses `nodemon` to automatically restart on file changes.

---

## Troubleshooting

### Port already in use
```bash
# Find process using port 3001
lsof -ti:3001

# Kill the process
kill -9 $(lsof -ti:3001)
```

### CORS issues
The server allows all origins by default. For production, update `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-production-domain.com'
}));
```

---

## Performance Notes

- Generates 3000 unique plates in ~1ms
- 500ms simulated latency per request
- No caching (fresh plates each request)
- No duplicates guaranteed
