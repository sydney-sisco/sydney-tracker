const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID,
});

async function storeActivity(activity, points) {
  const activitiesCollection = firestore.collection('activities');

  const data = {
    activity,
    points,
    timestamp: Firestore.Timestamp.now(),
  };

  try {
    const docRef = await activitiesCollection.add(data);
    console.log(`Activity recorded with ID: ${docRef.id}`);
  } catch (err) {
    console.error(`Error recording activity: ${err}`);
  }
}

module.exports = { firestore, storeActivity };
