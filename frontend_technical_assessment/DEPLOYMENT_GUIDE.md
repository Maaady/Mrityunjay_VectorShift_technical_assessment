# Deployment & Running Guide

## Complete Setup Instructions

### Prerequisites
- Node.js 14+ (for frontend)
- Python 3.7+ (for backend)
- npm (for frontend package management)
- pip (for Python packages)

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install packages
pip install fastapi uvicorn pydantic python-multipart
```

### Step 3: Start Backend Server
```bash
uvicorn main:app --reload --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Step 4: Verify Backend
Open browser and navigate to:
- `http://localhost:8000/` → Should show `{"Ping": "Pong"}`
- `http://localhost:8000/docs` → FastAPI interactive docs

**Backend is now running!** ✅

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Frontend Development Server
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Step 4: Access Frontend
- Frontend automatically opens at `http://localhost:3000`
- If not, manually navigate to it

**Frontend is now running!** ✅

---

## Testing the Integration

### Quick Test
1. **Create a simple pipeline:**
   - Drag "Input" node onto canvas
   - Drag "Output" node onto canvas
   - Connect Input to Output

2. **Submit the pipeline:**
   - Click "Submit Pipeline" button
   - Watch the browser alert

3. **Expected result:**
   ```
   Pipeline Analysis Results:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📊 Number of Nodes: 2
   🔗 Number of Edges: 1
   ✅ Is DAG: Yes
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

### Verify Communication
1. **Check backend console:**
   - Should show POST request to `/pipelines/parse`
   - Should log the incoming data

2. **Check frontend console (F12):**
   - Should show successful fetch response
   - No CORS errors

---

## Troubleshooting

### Problem: Backend won't start
```
Error: Address already in use
```
**Solution:**
```bash
# Kill process on port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :8000
kill -9 <PID>

# Try different port:
uvicorn main:app --reload --port 8001
# Then update frontend code to use :8001
```

### Problem: Frontend can't connect to backend
```
Error: Failed to fetch
```
**Solutions:**
1. Check backend is running: `http://localhost:8000` in browser
2. Check console for CORS errors
3. Verify port numbers match (8000 backend, 3000 frontend)
4. Try disabling browser extensions

### Problem: Submit button doesn't work
```
No response when clicking
```
**Solutions:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Verify nodes and edges exist (canvas not empty)

### Problem: Backend gives 400 error
```
{"detail": "Error message"}
```
**Solution:**
1. Check JSON format in Network tab
2. Ensure all fields are present
3. Verify data types match Pydantic models

---

## Production Deployment

### Build Frontend for Production
```bash
cd frontend
npm run build
```

Output: `build/` folder ready for deployment

### Run Backend in Production
```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

### Deploy Options

#### Option 1: Local Machine
```bash
# Terminal 1: Backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000

# Terminal 2: Frontend (via serve)
cd frontend
npm install -g serve
serve -s build -l 3000
```

#### Option 2: Docker
```dockerfile
# Backend Dockerfile
FROM python:3.9
WORKDIR /app
COPY backend/ .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]

# Frontend Dockerfile
FROM node:16 as build
WORKDIR /app
COPY frontend/ .
RUN npm install && npm run build

FROM node:16
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build .
CMD ["serve", "-s", ".", "-l", "3000"]
```

#### Option 3: Cloud Platforms
- **Backend**: Heroku, Railway, Render
- **Frontend**: Vercel, Netlify, GitHub Pages

---

## Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

Update `submit.js` to use:
```javascript
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const response = await fetch(`${backendUrl}/pipelines/parse`, {
    // ...
});
```

### Backend (.env)
```
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Monitoring & Debugging

### Backend Logs
```bash
# Verbose logging
uvicorn main:app --reload --log-level debug
```

### Frontend Logs
- Open DevTools: F12
- Console tab for errors
- Network tab for requests
- Sources tab for debugging

### Check Health
```bash
# Backend health
curl http://localhost:8000/

# Test endpoint
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [{"id": "1", "type": "test", "position": {"x": 0, "y": 0}, "data": {}}],
    "edges": []
  }'
```

---

## Performance Tips

### Frontend
- Use production build: `npm run build`
- Minimize console.log statements
- Use React DevTools to check renders

### Backend
- Use Gunicorn with multiple workers
- Enable caching for repeated requests
- Monitor memory usage with large pipelines

---

## Common Commands Reference

### Frontend
```bash
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
npm run eject       # Eject from CRA (irreversible!)
```

### Backend
```bash
uvicorn main:app --reload           # Dev mode
uvicorn main:app --reload --port 8001  # Custom port
gunicorn -w 4 -b 0.0.0.0:8000 main:app # Production
python -m pytest                    # Run tests
```

---

## File Locations

```
project/
├── frontend/
│   ├── src/
│   │   ├── submit.js            (Updated for backend)
│   │   ├── ...
│   ├── package.json
│   └── ...
├── backend/
│   ├── main.py                  (Updated with DAG logic)
│   └── ...
├── BACKEND_INTEGRATION_GUIDE.md (This file)
└── ...
```

---

## Checklist for Full Setup

- ✅ Python 3.7+ installed
- ✅ Node.js 14+ installed
- ✅ Backend dependencies installed (`pip install...`)
- ✅ Frontend dependencies installed (`npm install`)
- ✅ Backend running on port 8000
- ✅ Frontend running on port 3000
- ✅ Created simple test pipeline
- ✅ Clicked Submit and saw alert
- ✅ No errors in browser console
- ✅ Backend received POST request

**All set!** 🚀

---

## Getting Help

### Check These First
1. Terminal output for error messages
2. Browser console (F12 → Console)
3. Network tab for request details
4. Is backend running? (check port 8000)
5. Are you on localhost? (not production yet)

### Documentation Files
- `BACKEND_INTEGRATION_GUIDE.md` - Technical details
- `QUICK_START.md` - General usage
- `ARCHITECTURE_DIAGRAMS.md` - Visual reference

---

## Next Steps

Once everything is running:
1. Create more complex pipelines
2. Test with different node combinations
3. Try creating cycles (should show is_dag = false)
4. Experiment with the feature
5. Explore the code to understand how it works

**Happy pipeline building!** 🎉
