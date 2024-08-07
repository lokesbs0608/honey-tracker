import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
    projectId: Schema.Types.ObjectId;
    assignedTo: Schema.Types.ObjectId;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
}

const TaskSchema = new Schema<ITask>({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
});

export default model<ITask>('Task', TaskSchema);
