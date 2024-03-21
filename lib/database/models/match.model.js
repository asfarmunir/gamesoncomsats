import { Schema, model, models } from "mongoose"

const matchSchema = new Schema({
    teamA: String,
    teamB: String,
    sportsType: String,
    teamAGoal: Number,
    teamBGoals: Number,
    teamAScoreData: {
        score: Number,
        wickets: Number,
        overs: Number
    },
    teamBScoreData: {
        score: Number,
        wickets: Number,
        overs: Number
    },
},
    { timestamps: true })

const Match = models.match || model("Match", matchSchema);
export default Match