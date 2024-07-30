import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

async function openDatabase() {
  return await SQLite.openDatabaseAsync('places.db');
}

export async function init() {
  const database = await openDatabase();
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )
    `);
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
}

export async function insertPlace(place) {
  const database = await openDatabase();
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    return result;
  } catch (error) {
    console.error('Error inserting place:', error);
    throw error;
  }
}

export async function fetchPlaces() {
  const database = await openDatabase();
  try {
    const rows = await database.getAllAsync('SELECT * FROM places');
    const places = [];
    for (const db of rows) {
      places.push(
        new Place(
          db.title,
          db.imageUri,
          {
            address: db.address,
            lat: db.lat,
            lng: db.lng,
          },
          db.id
        )
      );
    }
    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
}
export async function fetchPlaceDetails(id) {
  const database = await openDatabase();
  try {
    const placeRow = await database.getFirstAsync(
      'SELECT * FROM places WHERE id = ?',
      [id]
    );
    if (!placeRow) {
      throw new Error('Place not found!');
    }

    const place = new Place(
      placeRow.title,
      placeRow.imageUri,
      { address: placeRow.address, lat: placeRow.lat, lng: placeRow.lng },
      placeRow.id
    );

    return place;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
}
