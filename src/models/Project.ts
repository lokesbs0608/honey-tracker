import { Schema, model, Document } from "mongoose";

interface IProject extends Document {
    name: string;
    description: string;
    lead: string;
    clientName: string;
    department: string;
    documents: {
        name: string;
        link: string;
    }[];
    project_start_date: Date;
    estimated_end_date: Date;
    job_id: string;
    created_user: {
        name: string;
        user_id: Schema.Types.ObjectId;
    };
    updated_user: {
        name: string;
        user_id: Schema.Types.ObjectId;
    };
    created_date: Date;
    updated_date: Date;
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    lead: { type: String, required: true },
    clientName: { type: String },
    department: { type: String },
    documents: {
        type: [
            {
                name: { type: String, required: true },
                link: { type: String, required: true },
            },
        ],
        default: []
    },
    project_start_date: { type: Date, required: true },
    estimated_end_date: { type: Date, required: true },
    job_id: { type: String, required: true },
    created_user: {
        type: {
            name: { type: String, required: true },
            user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
        },
        required: true
    },
    updated_user: {
        type: {
            name: { type: String, required: true },
            user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
        },
        required: true
    },
    created_date: { type: Date, default: Date.now, required: true },
    updated_date: { type: Date, required: true }
});

export default model<IProject>("Project", ProjectSchema);
