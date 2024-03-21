'use server'

import Match from "../models/match.model"
import { connectToDatabase } from ".."


export const startMatch = async (matchData) => {
    try {
        await connectToDatabase();
        const newMatch = await Match.create(matchData);
        console.log(newMatch);

        return JSON.parse(JSON.stringify(newMatch));

    } catch (error) {
        console.log(error);
    }
}