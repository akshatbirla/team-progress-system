const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    assignedTo: {
      type: String,
      required: true,
      trim: true,
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
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
