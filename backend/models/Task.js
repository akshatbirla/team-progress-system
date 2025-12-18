const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    assignedTo: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },

    priority: {
      type: String,
      enum: ["Very High", "High", "Medium", "Low", "Very Low"],
      default: "Medium",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    // 🔥 AI FIELDS (NEW)
    aiDescription: {
      type: String,
    },

    aiPoweredBy: {
      type: String,
      default: "Gemini AI",
    },

    aiGeneratedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
