#!/bin/bash

# Calendar Cron Mailer Management Script
# Usage: ./start.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Calendar Cron Mailer Manager  ${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_info "Node.js version: $NODE_VERSION"
}

# Setup function
setup() {
    print_header
    print_info "Setting up Calendar Cron Mailer..."
    
    check_node
    
    # Install dependencies
    print_info "Installing dependencies..."
    if npm install; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
    
    # No Prisma setup needed for API-only approach
    print_info "Skipping Prisma setup (using API-only approach)"
    
    # Create logs directory
    print_info "Creating logs directory..."
    mkdir -p logs
    print_success "Logs directory created"
    
    # Make scripts executable
    chmod +x index.js test.js start.sh
    print_success "Scripts made executable"
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Please create one with your configuration."
        print_info "Example .env file:"
        echo ""
        cat << EOF
API_BASE_URL="http://localhost:3000"
EMAIL_HOST="your-smtp-host"
EMAIL_PORT="465"
EMAIL_SECURE="true"
EMAIL_USER="your-email@domain.com"
EMAIL_PASS="your-password"
EMAIL_FROM="your-email@domain.com"
CRON_SCHEDULE="*/5 * * * *"
TIMEZONE="Asia/Ho_Chi_Minh"
LOG_LEVEL="info"
LOG_FILE="./logs/cron-mailer.log"
EOF
        echo ""
    else
        print_success ".env file found"
    fi
    
    print_success "Setup completed! Run './start.sh test' to verify configuration."
}

# Test function
test_config() {
    print_header
    print_info "Testing configuration..."
    
    check_node
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found. Run './start.sh setup' first."
        exit 1
    fi
    
    case "${2:-all}" in
        all)
            node test.js
            ;;
        db|database)
            node test.js --db-only
            ;;
        email)
            node test.js --email-only
            ;;
        api)
            node test.js --api-only
            ;;
        process|processing)
            node test.js --process-only
            ;;
        *)
            print_error "Unknown test type: $2"
            print_info "Available test types: all, db, email, api, process"
            exit 1
            ;;
    esac
}

# Start cron service
start_service() {
    print_header
    print_info "Starting Calendar Cron Mailer service..."
    
    check_node
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found. Run './start.sh setup' first."
        exit 1
    fi
    
    print_info "Starting cron service (Press Ctrl+C to stop)..."
    node index.js
}

# Run once and exit
run_once() {
    print_header
    print_info "Running reminder processing once..."
    
    check_node
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found. Run './start.sh setup' first."
        exit 1
    fi
    
    node index.js --test
}

# Run in development mode with debug logging
dev_mode() {
    print_header
    print_info "Starting in development mode with debug logging..."
    
    check_node
    
    if [ ! -f ".env" ]; then
        print_error ".env file not found. Run './start.sh setup' first."
        exit 1
    fi
    
    export LOG_LEVEL="debug"
    print_info "Debug logging enabled"
    print_info "Starting cron service (Press Ctrl+C to stop)..."
    node index.js
}

# Show logs
show_logs() {
    print_header
    print_info "Showing recent logs..."
    
    if [ -f "logs/cron-mailer.log" ]; then
        tail -50 logs/cron-mailer.log
    else
        print_warning "No log file found. Run the service first to generate logs."
    fi
}

# Follow logs in real-time
follow_logs() {
    print_header
    print_info "Following logs in real-time (Press Ctrl+C to stop)..."
    
    if [ -f "logs/cron-mailer.log" ]; then
        tail -f logs/cron-mailer.log
    else
        print_warning "No log file found. Run the service first to generate logs."
    fi
}

# Show status
show_status() {
    print_header
    print_info "Calendar Cron Mailer Status"
    echo ""
    
    # Check if .env exists
    if [ -f ".env" ]; then
        print_success ".env file exists"
    else
        print_error ".env file missing"
    fi
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        print_success "Dependencies installed"
    else
        print_error "Dependencies not installed"
    fi
    
    # Check if logs directory exists
    if [ -d "logs" ]; then
        print_success "Logs directory exists"
        if [ -f "logs/cron-mailer.log" ]; then
            LOG_SIZE=$(du -h logs/cron-mailer.log | cut -f1)
            print_info "Log file size: $LOG_SIZE"
        fi
    else
        print_warning "Logs directory missing"
    fi
    
    # Check API connection
    print_info "API-only approach - no Prisma client needed"
    
    echo ""
    print_info "To test configuration: ./start.sh test"
    print_info "To start service: ./start.sh start"
}

# Show help
show_help() {
    print_header
    echo "Usage: ./start.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup       Setup the cron mailer (install dependencies, create directories)"
    echo "  test [type] Test configuration (database, email, api, processing)"
    echo "  start       Start the cron service"
    echo "  once        Run reminder processing once and exit"
    echo "  dev         Start in development mode with debug logging"
    echo "  logs        Show recent logs"
    echo "  follow      Follow logs in real-time"
    echo "  status      Show current status"
    echo "  help        Show this help message"
    echo ""
    echo "Test Types:"
    echo "  all         Test all components (default)"
    echo "  api         Test API connection only"
    echo "  email       Test email configuration only"
    echo "  endpoints   Test API endpoints only"
    echo "  process     Test reminder processing only"
    echo ""
    echo "Examples:"
    echo "  ./start.sh setup        # Initial setup"
    echo "  ./start.sh test         # Test all components"
    echo "  ./start.sh test api     # Test API endpoints only"
    echo "  ./start.sh test email   # Test email only"
    echo "  ./start.sh start        # Start cron service"
    echo "  ./start.sh once         # Run once for testing"
    echo "  ./start.sh dev          # Development mode"
    echo "  ./start.sh logs         # View recent logs"
    echo "  ./start.sh follow       # Follow logs real-time"
    echo ""
    echo "Environment Variables:"
    echo "  CRON_SCHEDULE    Cron schedule (default: */5 * * * *)"
    echo "  TIMEZONE         Timezone (default: Asia/Ho_Chi_Minh)"
    echo "  LOG_LEVEL        Log level: debug, info, warn, error"
    echo ""
}

# Main script logic
case "${1:-help}" in
    setup)
        setup
        ;;
    test)
        test_config "$@"
        ;;
    start)
        start_service
        ;;
    once)
        run_once
        ;;
    dev)
        dev_mode
        ;;
    logs)
        show_logs
        ;;
    follow)
        follow_logs
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac