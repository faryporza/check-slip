import mongoose from 'mongoose';

const slipSchema = new mongoose.Schema(
  {
    slipNumber: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Slip = mongoose.model('Slip', slipSchema);

export default Slip;
