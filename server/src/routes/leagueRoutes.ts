import express, { Request, Response } from 'express';
import axios from 'axios';
import Competition from '../models/Competition';
import Team from '../models/Team';
import Player from '../models/Player';
import mongoose from 'mongoose';

const router = express.Router();

// Delay for controlling limit frequency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Import League Data
router.post('/import', async (req: Request, res: Response) => {
  const { leagueCode } = req.body;

  try {
    // Fetch competition data
    const competitionResponse = await axios.get(`https://api.football-data.org/v4/competitions/${leagueCode}`, {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });

    // Search if there is already the competition in DB in order to not generate duplicates
    const competitionData = competitionResponse.data;
    let competition = await Competition.findOne({ code: competitionData.code });

    // Save in case the competition is not in the DB
    if (!competition) {
      competition = new Competition({
        name: competitionData.name,
        code: competitionData.code,
      });
      await competition.save();
    }

    // Fetch teams and players
    const teamsResponse = await axios.get(`https://api.football-data.org/v4/competitions/${leagueCode}/teams`, {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
    });

    const teamsData = teamsResponse.data.teams;

    // Loop in the DB in order to not generate duplicates before importing teams
    for (const teamData of teamsData) {
      let team = await Team.findOne({ tla: teamData.tla });
      if (!team) {
        team = new Team({
          name: teamData.name,
          tla: teamData.tla,
          shortName: teamData.shortName,
          crest: teamData.crest,
          competition: competition._id as mongoose.Types.ObjectId,
        });
        await team.save();

        // Fetch players for each team
        const playersResponse = await axios.get(`https://api.football-data.org/v4/teams/${teamData.id}`, {
          headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
        });

        const playersData = playersResponse.data.squad;

        // Loop in the DB in order to not generate duplicates before importing teams
        for (const playerData of playersData) {
          const player = new Player({
            name: playerData.name,
            position: playerData.position,
            dateOfBirth: playerData.dateOfBirth,
            nationality: playerData.nationality,
            team: team._id as mongoose.Types.ObjectId,
          });
          await player.save();
        }

        // 6 second delay to respect rate limit (10 requests/min free token)
        await delay(6000);
      } else {
        // Update competition-team relationship
        team.competition = competition._id as mongoose.Types.ObjectId;
        await team.save();
      }
    }

    res.status(200).json({ message: 'League data imported successfully' });
  } catch (error) {
    // console.error('Error importing league data:', error);
    res.status(500).json({ error: 'Error importing league data' });
  }
});

router.get('/teams/:leagueCode', async (req: Request, res: Response) => {
  const { leagueCode } = req.params;
  const { teamName } = req.query;

  try {
    const competition = await Competition.findOne({ code: leagueCode });
    if (!competition) {
      return res.status(404).json({ error: 'League not found' });
    }

    const teamsQuery: any = { competition: competition._id };

    // If there is teamName, filter by one. If not, don't filter, return all teams from the specific league
    if (teamName) {
      teamsQuery.name = new RegExp(teamName as string, 'i');
    }

    const teams = await Team.find(teamsQuery);
    res.json(teams);
  } catch (error) {
    // console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Error fetching teams' });
  }
});

// Fetch players by id
router.get('/players/:leagueCode', async (req: Request, res: Response) => {
  const { leagueCode } = req.params;
  const { teamId } = req.query;

  try {
    const competition = await Competition.findOne({ code: leagueCode });
    if (!competition) {
      return res.status(404).json({ error: 'League not found' });
    }

    // Create query for searching players
    let playersQuery: { team?: mongoose.Types.ObjectId | { $in: mongoose.Types.ObjectId[] } } = {};

    if (teamId) {
      playersQuery.team = new mongoose.Types.ObjectId(teamId as string);
    } else {
      const teams = await Team.find({ competition: competition._id });
      const teamIds = teams.map(team => team._id as mongoose.Types.ObjectId);
      playersQuery.team = { $in: teamIds };
    }

    const players = await Player.find(playersQuery);
    res.json(players);
  } catch (error) {
    // console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Error fetching players' });
  }
});


export default router;