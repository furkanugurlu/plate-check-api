# PlateCheck API

Express.js API server for Turkish license plate recognition app.

## Features

- ✅ Generate 3000 unique Turkish license plates
- ✅ CORS enabled for React Native development
- ✅ Simulated API latency (500ms)
- ✅ Request logging with timestamps
- ✅ Health check endpoint
- ✅ Proper error handling

## Turkish License Plate Format

Plates follow the format: **"XX YYY ZZZ"**

- **XX**: 2 digits (01-81, Turkish city codes)
- **YYY**: 2-3 letters (A-Z, excluding Q, W, X)
- **ZZZ**: 2-3 digits (10-999)

### Examples
```
34 ABC 123
06 ARS 06
35 JYA 869
01 BRK 430
81 ZYK 999
```

## Installation

```bash
cd api
npm install
```

## Running the Server

### Production Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

The server will start on **http://localhost:3001**

## API Endpoints

### Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

### Get Daily Plates
```bash
GET /api/plates/daily
```

**Response:**
```json
{
  "plates": [
    "06 ARS 06",
    "11 BRK 430",
    "34 ABC 123",
    ...
  ],
  "count": 3000,
  "timestamp": "2026-02-05T10:07:20.123Z"
}
```

## Testing

### Using curl

**Health check:**
```bash
curl http://localhost:3001/health
```

**Get plates:**
```bash
curl http://localhost:3001/api/plates/daily
```

**Get plates (formatted):**
```bash
curl http://localhost:3001/api/plates/daily | json_pp
```

### Using HTTPie (if installed)
```bash
http GET http://localhost:3001/api/plates/daily
```

### Using JavaScript (fetch)
```javascript
fetch('http://localhost:3001/api/plates/daily')
  .then(res => res.json())
  .then(data => {
    console.log(`Received ${data.count} plates`);
    console.log('First 5 plates:', data.plates.slice(0, 5));
  });
```

### Using React Native
```javascript
const fetchPlates = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/plates/daily');
    const data = await response.json();
    console.log(`Loaded ${data.count} plates`);
    return data.plates;
  } catch (error) {
    console.error('Error fetching plates:', error);
  }
};
```

## File Structure

```
api/
├── server.js           # Main Express server
├── generatePlates.js   # Plate generator utility
├── package.json        # Dependencies and scripts
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Environment Variables

You can customize the port by setting the `PORT` environment variable:

```bash
PORT=4000 npm start
```

## Development Notes

- The server uses a 500ms delay to simulate real API latency
- All requests are logged with timestamps
- CORS is enabled for all origins (suitable for development)
- Plates are generated fresh on each request (no caching)
- Duplicate plates are automatically prevented

## Production Considerations

For production deployment, consider:

1. **CORS**: Restrict to specific origins
   ```javascript
   app.use(cors({
     origin: 'https://your-app-domain.com'
   }));
   ```

2. **Rate Limiting**: Add rate limiting middleware
   ```bash
   npm install express-rate-limit
   ```

3. **Caching**: Cache generated plates to reduce CPU usage
4. **Environment Variables**: Use `.env` file for configuration
5. **HTTPS**: Use SSL/TLS certificates
6. **Logging**: Use a proper logging library (e.g., Winston, Morgan)

## License

MIT
