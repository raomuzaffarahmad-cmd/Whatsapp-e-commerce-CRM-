const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    whatsappPhone: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    preferences: {
      newsletter: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: true },
      email: { type: Boolean, default: true }
    },
    tags: [String],
    loyaltyPoints: {
      type: Number,
      default: 0
    },
    totalPurchases: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    lastOrderDate: Date,
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Blocked'],
      default: 'Active'
    },
    notes: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Indexes for better query performance
CustomerSchema.index({ email: 1 });
CustomerSchema.index({ phone: 1 });
CustomerSchema.index({ whatsappPhone: 1 });
CustomerSchema.index({ createdAt: -1 });

// Virtual for full name
CustomerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Methods
CustomerSchema.methods.updateLoyaltyPoints = function(points) {
  this.loyaltyPoints += points;
  return this.save();
};

CustomerSchema.methods.recordPurchase = function(amount) {
  this.totalPurchases += 1;
  this.totalSpent += amount;
  this.lastOrderDate = new Date();
  return this.save();
};

module.exports = mongoose.model('Customer', CustomerSchema);
