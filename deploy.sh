#!/bin/bash

# MediHub Rwanda Deployment Script

echo "🏥 Starting MediHub Rwanda Deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p ssl
mkdir -p logs

# Set environment variables
echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOL
NODE_ENV=production
MONGODB_URI=mongodb://admin:medihub2024@mongodb:27017/medihub?authSource=admin
JWT_SECRET=$(openssl rand -base64 32)
GEMINI_API_KEY=your-gemini-api-key-here
PORT=5000
EOL
fi

# Build and start services
echo "🚀 Building and starting services..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend service is healthy"
else
    echo "❌ Backend service is not responding"
    docker-compose logs backend
fi

if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Nginx service is healthy"
else
    echo "❌ Nginx service is not responding"
    docker-compose logs nginx
fi

# Show running containers
echo "📊 Running containers:"
docker-compose ps

echo "🎉 MediHub Rwanda deployment completed!"
echo "🌐 Application is available at: http://localhost"
echo "📋 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"