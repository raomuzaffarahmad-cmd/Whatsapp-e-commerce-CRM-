# WhatsApp E-Commerce CRM

A comprehensive Customer Relationship Management system for e-commerce businesses with WhatsApp integration and AI-powered agent for customer support.

## Features

✅ **Customer Management** - Track customer profiles, preferences, and purchase history
✅ **Order Management** - Complete order lifecycle management
✅ **Inventory Management** - Real-time stock tracking and management
✅ **Sales Analytics** - Detailed sales reports and analytics
✅ **WhatsApp Integration** - Send notifications, order updates, and customer support
✅ **AI Agent** - Intelligent chatbot for customer inquiries and support
✅ **Admin Dashboard** - Centralized control panel for all operations
✅ **Multi-Channel Support** - Email, SMS, and WhatsApp notifications

## Project Structure

```
Whatsapp-e-commerce-CRM-/
├── backend/                  # Node.js/Express API Server
├── frontend/                 # React Admin Dashboard
├── whatsapp-agent/           # WhatsApp AI Agent
├── docker-compose.yml        # Docker configuration
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Tech Stack

**Backend:**
- Node.js v18+
- Express.js
- MongoDB
- JWT Authentication

**Frontend:**
- React 18
- Redux Toolkit
- Tailwind CSS
- Chart.js

**Integrations:**
- WhatsApp Business API (Twilio/Meta)
- OpenAI API (for AI Agent)
- Stripe (Payment Processing)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Docker & Docker Compose
- WhatsApp Business Account
- OpenAI API Key

### Installation

1. Clone the repository
```bash
git clone https://github.com/raomuzaffarahmad-cmd/Whatsapp-e-commerce-CRM-
cd Whatsapp-e-commerce-CRM-
```

2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../whatsapp-agent && npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Run with Docker
```bash
docker-compose up -d
```

5. Start development servers
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start

# Terminal 3: WhatsApp Agent
cd whatsapp-agent && npm run dev
```

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Analytics
- `GET /api/analytics/sales` - Sales analytics
- `GET /api/analytics/customers` - Customer analytics
- `GET /api/analytics/revenue` - Revenue reports

## WhatsApp Integration

The system integrates with WhatsApp Business API to:
- Send order confirmations
- Send shipping updates
- Send promotional messages
- Receive customer inquiries
- Provide 24/7 customer support via AI Agent

## AI Agent

The AI-powered agent handles:
- Customer inquiries about products
- Order status queries
- Return and refund requests
- Product recommendations
- Complaint resolution
- Lead generation

## Database Schema

### Customer
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  whatsappPhone: String,
  address: Object,
  preferences: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,
  items: Array,
  totalAmount: Number,
  status: String, // pending, confirmed, shipped, delivered
  paymentStatus: String,
  shippingAddress: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  images: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email support@crm.local or create an issue in the GitHub repository.

## Author

**Rao Muzaffar Ahmad** - [GitHub](https://github.com/raomuzaffarahmad-cmd)
