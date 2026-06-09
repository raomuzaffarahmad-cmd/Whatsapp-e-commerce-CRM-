const mongoose = require('mongoose');

const WhatsAppMessageSchema = new mongoose.Schema(
  {
    messageId: {
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
    customerPhone: {
      type: String,
      required: true
    },
    conversationId: {
      type: String,
      index: true
    },
    sender: {
      type: String,
      enum: ['Customer', 'Agent', 'System'],
      required: true,
      index: true
    },
    senderName: String,
    messageType: {
      type: String,
      enum: ['Text', 'Image', 'Document', 'Audio', 'Video', 'Location'],
      default: 'Text'
    },
    content: String,
    mediaUrl: String,
    mediaType: String,
    relatedOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    relatedProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    intent: {
      type: String,
      enum: ['Inquiry', 'Support', 'Order', 'Complaint', 'Feedback', 'Other'],
      default: 'Other'
    },
    status: {
      type: String,
      enum: ['Sent', 'Delivered', 'Read', 'Failed'],
      default: 'Sent'
    },
    aiResponse: {
      generated: Boolean,
      model: String,
      confidence: Number,
      responseText: String
    },
    humanReply: {
      agentId: mongoose.Schema.Types.ObjectId,
      agentName: String,
      replyText: String,
      repliedAt: Date
    },
    tags: [String],
    notes: String,
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
WhatsAppMessageSchema.index({ customerId: 1, createdAt: -1 });
WhatsAppMessageSchema.index({ conversationId: 1, createdAt: -1 });
WhatsAppMessageSchema.index({ sender: 1, createdAt: -1 });
WhatsAppMessageSchema.index({ status: 1 });

// Methods
WhatsAppMessageSchema.methods.markAsDelivered = function() {
  this.status = 'Delivered';
  return this.save();
};

WhatsAppMessageSchema.methods.markAsRead = function() {
  this.status = 'Read';
  return this.save();
};

WhatsAppMessageSchema.methods.markAsFailed = function() {
  this.status = 'Failed';
  return this.save();
};

WhatsAppMessageSchema.methods.addAIResponse = function(model, responseText, confidence = 0.95) {
  this.aiResponse = {
    generated: true,
    model,
    responseText,
    confidence
  };
  return this.save();
};

WhatsAppMessageSchema.methods.addHumanReply = function(agentId, agentName, replyText) {
  this.humanReply = {
    agentId,
    agentName,
    replyText,
    repliedAt: new Date()
  };
  return this.save();
};

module.exports = mongoose.model('WhatsAppMessage', WhatsAppMessageSchema);
