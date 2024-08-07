import { Schema, model, Document } from 'mongoose';

interface ITimeSheet extends Document {
    userId: Schema.Types.ObjectId;
    taskId: Schema.Types.ObjectId;
    hours: number;
    date: Date;
}

const TimeSheetSchema = new Schema<ITimeSheet>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    hours: { type: Number, required: true },
    date: { type: Date, required: true },
});

export default model<ITimeSheet>('TimeSheet', TimeSheetSchema);
