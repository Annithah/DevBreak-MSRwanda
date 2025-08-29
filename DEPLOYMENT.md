# MediHub Rwanda - Deployment Guide

## 🚀 Quick Deployment

### Prerequisites
- Docker & Docker Compose installed
- Node.js 18+ (for development)
- MongoDB (handled by Docker)

### One-Click Deployment
```bash
./deploy.sh
```

## 🏗️ Manual Deployment

### 1. Environment Setup
```bash
# Clone repository
git clone <repository-url>
cd DevBreak-MSRwanda

# Create environment file
cp .env.example .env
# Edit .env with your configurations
```

### 2. Docker Deployment
```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

### 3. Development Setup
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Start development servers
npm run dev  # Frontend (port 3000)
cd backend && npm start  # Backend (port 5000)
```

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb://admin:medihub2024@mongodb:27017/medihub
JWT_SECRET=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
```

### SSL Configuration
1. Place SSL certificates in `ssl/` directory
2. Update `nginx.conf` with certificate paths
3. Restart nginx service

## 🏥 System Architecture

### Services
- **Frontend**: React.js application
- **Backend**: Node.js/Express API server
- **Database**: MongoDB with authentication
- **Proxy**: Nginx reverse proxy
- **AI**: Gemini API integration

### Ports
- **80/443**: Nginx (HTTP/HTTPS)
- **5000**: Backend API
- **27017**: MongoDB
- **3000**: Frontend (development only)

## 🔍 Health Checks

### API Health Check
```bash
curl http://localhost:5000/api/health
```

### Service Status
```bash
docker-compose ps
docker-compose logs [service-name]
```

## 🛠️ Maintenance

### Backup Database
```bash
docker exec medihub-mongo mongodump --out /backup
```

### Update Application
```bash
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### Scale Services
```bash
docker-compose up -d --scale backend=3
```

## 🔒 Security

### Production Checklist
- [ ] Change default passwords
- [ ] Configure SSL certificates
- [ ] Set strong JWT secret
- [ ] Configure firewall rules
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring and logging

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Content Security Policy configured

## 📊 Monitoring

### Application Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### System Metrics
- CPU and Memory usage via Docker stats
- Database performance via MongoDB logs
- API response times via application logs

## 🆘 Troubleshooting

### Common Issues

**Service won't start:**
```bash
docker-compose down
docker-compose up -d
```

**Database connection issues:**
```bash
docker-compose logs mongodb
docker-compose restart mongodb
```

**SSL certificate errors:**
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout
```

### Support
- Check logs: `docker-compose logs -f`
- Restart services: `docker-compose restart [service]`
- Full reset: `docker-compose down -v && docker-compose up -d`