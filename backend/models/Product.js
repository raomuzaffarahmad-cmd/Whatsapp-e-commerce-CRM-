const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    subcategory: String,
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    salePrice: {
      type: Number,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    },
    images: [
      {
        url: String,
        alt: String
      }
    ],
    thumbnail: String,
    specifications: mongoose.Schema.Types.Mixed,
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [
      {
        customerId: mongoose.Schema.Types.ObjectId,
        customerName: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    tags: [String],
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Discontinued'],
      default: 'Active'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    supplier: {
      name: String,
      contact: String
    },
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
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

// Indexes
ProductSchema.index({ sku: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ createdAt: -1 });

// Methods
ProductSchema.methods.isLowStock = function() {
  return this.stock <= this.lowStockThreshold;
};

ProductSchema.methods.updateStock = function(quantity) {
  this.stock += quantity;
  return this.save();
};

ProductSchema.methods.addReview = function(customerId, customerName, rating, comment) {
  this.reviews.push({ customerId, customerName, rating, comment });
  this.save();
};

ProductSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.rating = sum / this.reviews.length;
  return this.save();
};

module.exports = mongoose.model('Product', ProductSchema);