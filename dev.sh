#!/bin/bash

# The Bookie Butcher - Development Setup Script
# Professional Sports Analytics Platform

set -e

echo "🥩 The Bookie Butcher - Development Setup"
echo "========================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! command -v docker &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Function to start services
start_services() {
    echo "🚀 Starting The Bookie Butcher services..."
    echo ""
    
    # Build and start all services
    docker-compose up -d --build
    
    echo ""
    echo "✅ Services started successfully!"
    echo ""
    echo "🌐 Service URLs:"
    echo "  • Web Dashboard: http://localhost:3000"
    echo "  • Mobile App: http://localhost:19000"
    echo "  • Backend API: http://localhost:8000"
    echo "  • API Docs: http://localhost:8000/docs"
    echo "  • Health Check: http://localhost:8000/health"
    echo ""
    echo "💾 Database: PostgreSQL on localhost:5432"
    echo "⚡ Cache: Redis on localhost:6379"
    echo ""
    echo "🛠️ Development commands:"
    echo "  • View logs: docker-compose logs -f"
    echo "  • Stop services: docker-compose down"
    echo "  • Restart services: docker-compose restart"
    echo ""
    echo "🥩 Ready for the slaughter!"
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping The Bookie Butcher services..."
    docker-compose down
    echo "✅ All services stopped."
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs (Ctrl+C to exit)..."
    docker-compose logs -f
}

# Function to restart services
restart_services() {
    echo "🔄 Restarting The Bookie Butcher services..."
    docker-compose restart
    echo "✅ Services restarted."
}

# Function to reset everything
reset_services() {
    echo "⚠️ This will remove all data and restart from scratch."
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🧹 Resetting all services and data..."
        docker-compose down -v --remove-orphans
        docker system prune -f
        echo "✅ Reset complete. Run '$0 start' to begin fresh."
    else
        echo "❌ Reset cancelled."
    fi
}

# Function to show status
show_status() {
    echo "📊 Service Status:"
    echo ""
    docker-compose ps
    echo ""
    if docker-compose ps | grep -q "Up"; then
        echo "✅ Services are running!"
        echo ""
        echo "🌐 Access URLs:"
        echo "  • Web Dashboard: http://localhost:3000"
        echo "  • Mobile App: http://localhost:19000"
        echo "  • Backend API: http://localhost:8000"
        echo "  • Health Check: http://localhost:8000/health"
    else
        echo "❌ No services are currently running."
        echo "Run '$0 start' to begin."
    fi
}

# Function to install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    echo ""
    
    echo "Installing backend dependencies..."
    cd backend
    pip install -r requirements.txt
    cd ..
    
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    echo "Installing mobile dependencies..."
    cd mobile
    npm install
    cd ..
    
    echo "✅ All dependencies installed!"
}

# Function to run tests
run_tests() {
    echo "🧪 Running tests..."
    echo ""
    
    echo "Testing backend..."
    cd backend
    pytest
    cd ..
    
    echo "✅ All tests passed!"
}

# Function to show help
show_help() {
    echo "🥩 The Bookie Butcher - Development Commands"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start      - Start all development services"
    echo "  stop       - Stop all services"
    echo "  restart    - Restart all services"
    echo "  status     - Show service status"
    echo "  logs       - Show service logs"
    echo "  reset      - Reset everything and clean data"
    echo "  deps       - Install all dependencies"
    echo "  test       - Run test suite"
    echo "  help       - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start      # Start all services"
    echo "  $0 logs       # View logs"
    echo "  $0 status     # Check what's running"
    echo ""
}

# Main script logic
case "${1:-start}" in
    "start")
        start_services
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        restart_services
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "reset")
        reset_services
        ;;
    "deps")
        install_deps
        ;;
    "test")
        run_tests
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac