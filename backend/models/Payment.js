const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      index: true
    },
    transactionId: {
      type: String,
      unique: true,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery', 'Stripe'],
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Cancelled', 'Refunded'],
      default: 'Pending',
      index: true
    },
    cardDetails: {
      last4: String,
      brand: String,
      expiryMonth: Number,
      expiryYear: Number
    },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String
    },
    stripePaymentIntentId: String,
    paypalTransactionId: String,
    description: String,
    receiptUrl: String,
    refunds: [
      {
        refundId: String,
        amount: Number,
        reason: String,
        status: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    metadata: mongoose.Schema.Types.Mixed,
    errorMessage: String,
    retryCount: {
      type: Number,
      default: 0
    },
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
PaymentSchema.index({ orderId: 1, createdAt: -1 });
PaymentSchema.index({ transactionId: 1 });
PaymentSchema.index({ status: 1, createdAt: -1 });

// Methods
PaymentSchema.methods.markAsCompleted = function() {
  this.status = 'Completed';
  return this.save();
};

PaymentSchema.methods.markAsFailed = function(errorMessage) {
  this.status = 'Failed';
  this.errorMessage = errorMessage;
  this.retryCount += 1;
  return this.save();
};

PaymentSchema.methods.refund = function(refundAmount, reason) {
  const refundId = `REF_${Date.now()}`;
  this.refunds.push({
    refundId,
    amount: refundAmount,
    reason,
    status: 'Completed'
  });
  
  if (refundAmount === this.amount) {
    this.status = 'Refunded';
  }
  
  return this.save();
};

module.exports = mongoose.model('Payment', PaymentSchema);