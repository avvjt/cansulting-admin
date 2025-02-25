// Process.js
import mongoose from "mongoose";

const processSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true,
        index: true
    },
    phase: { 
        type: String, 
        required: [true, "Phase is required"],
        trim: true
    },
    name: { 
        type: String, 
        required: [true, "Name is required"],
        trim: true
    },
    src: { 
        type: String, 
        default: function() {
            return `/images/phase${this.id}.png`;
        }
    },
    review: { 
        type: String, 
        default: "",
        trim: true
    },
    button: { 
        type: String, 
        default: "read",
        enum: ["read"]
    }
}, {
    timestamps: true
});

processSchema.index({ id: 1 });

processSchema.pre('save', function(next) {
    if (this.isModified('phase')) {
        const phaseNum = String(this.id).padStart(2, '0');
        this.phase = `${phaseNum}. Phase`;
    }
    next();
});

export default mongoose.model("Process", processSchema);