import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LoanSummarySchema = new Schema({
  text: {
    type: String,
    required: true
  },
   _customer : { type: Schema.Types.ObjectId, ref: 'Customer' }
}, {
  timestamps: true
});

const LoanSummaryModel = mongoose.model('LoanSummary', LoanSummarySchema);

export default PostModel;
