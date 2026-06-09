const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['Sales', 'Customers', 'Orders', 'Products', 'WhatsApp'],
      required: true,
      index: true
    },
    metrics: {
      totalSales: Number,
      totalOrders: Number,
      averageOrderValue: Number,
      conversionRate: Number,
      newCustomers: Number,
      returningCustomers: Number,
      totalCustomers: Number,
      customerRetentionRate: Number,
      pendingOrders: Number,
      shippedOrders: Number,
      deliveredOrders: Number,
      cancelledOrders: Number,
      topSellingProducts: [
        {
          productId: mongoose.Schema.Types.ObjectId,
          productName: String,
          quantity: Number,
          revenue: Number
        }
      ],
      lowStockProducts: Number,
      outOfStockProducts: Number,
      messagesReceived: Number,
      messagesSent: Number,
      aiResponsesGenerated: Number,
      messageResolutionRate: Number,
      averageResponseTime: Number,
      customerSatisfactionScore: Number
    },
    period: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
      default: 'Daily'
    },
    startDate: Date,
    endDate: Date,
    comparison: {
      previousPeriod: mongoose.Schema.Types.Mixed,
      percentageChange: Number
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
AnalyticsSchema.index({ date: -1, type: 1 });
AnalyticsSchema.index({ period: 1 });

// Methods
AnalyticsSchema.methods.calculateGrowth = function(previousValue) {
  if (!previousValue || previousValue === 0) return 0;
  return ((this.metrics.totalSales - previousValue) / previousValue) * 100;
};

AnalyticsSchema.statics.generateDailyReport = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const orders = await mongoose.model('Order').find({
    createdAt: { $gte: today, $lt: tomorrow }
  });
  
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  
  const report = new this({
    date: today,
    type: 'Sales',
    period: 'Daily',
    metrics: {
      totalSales,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0
    }
  });
  
  return report.save();
};

module.exports = mongoose.model('Analytics', AnalyticsSchema);