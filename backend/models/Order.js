const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      index: true
    },
    customerInfo: {
      name: String,
      email: String,
      phone: String,
      whatsappPhone: String
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        productName: String,
        sku: String,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        price: Number,
        discount: Number,
        subtotal: Number
      }
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
      default: 'Pending',
      index: true
    },
    trackingNumber: String,
    shippingMethod: String,
    notes: String,
    internalNotes: String,
    statusHistory: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        updatedBy: String,
        notes: String
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Indexes
OrderSchema.index({ customerId: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });

// Methods
OrderSchema.methods.calculateTotal = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  this.totalAmount = this.subtotal + this.shippingCost + this.tax - this.discount;
  return this.totalAmount;
};

OrderSchema.methods.updateStatus = function(newStatus, notes = '', updatedBy = 'System') {
  this.statusHistory.push({
    status: this.orderStatus,
    timestamp: new Date(),
    updatedBy,
    notes
  });
  this.orderStatus = newStatus;
  return this.save();
};

OrderSchema.methods.cancelOrder = function() {
  if (['Shipped', 'Delivered'].includes(this.orderStatus)) {
    throw new Error('Cannot cancel order that has been shipped or delivered');
  }
  this.orderStatus = 'Cancelled';
  this.paymentStatus = 'Refunded';
  return this.save();
};

module.exports = mongoose.model('Order', OrderSchema);