const express = require('express');
const app = express();

const users = require('./users');

// Local data 
global.secretKey = 'fdcyDygl#hgc@rtghg7';
global.nextUserId = 2;

global.users = {
  1: {
    user_id: 1,
    username: "sampleUser",
    password: "password123",
    sites: [],
    drones: []
  },
};

global.sites = {
  1: {
    site_id: 1,
    site_name: "chandigarh",
    position: {
      latitude: "30.74331785394927",
      longitude: "76.76764521327273"
    },
    missions:[],
    drones: [],
  },
  2: {
    site_id: 2,
    site_name: "Panchkula",
    position: {
      latitude: "30.710153812518943",
      longitude: "76.85332109811308"
    },
    missions:[],
    drones: [],
  },
  3: {
    site_id: 3,
    site_name: "Mohali",
    position: {
      latitude: "30.700826766861486",
      longitude: "76.69806619236282"
    },
    missions:[],
    drones: [],
  },
  4: {
    site_id: 4,
    site_name: "Zirakpur",
    position: {
      latitude: "30.656496135477493",
      longitude: "76.82576171457889"
    },
    missions:[],
    drones: [],
  },
};

global.drones = {
  1: {
    id: 1,
    drone_id: "wVQv1qs6",
    name: "Virtual Drone",
    make_name: "cloudsim",
    drone_type: "Real Drone",
    site_id: '',
    mission_id: '',
    deleted_by: "0",
    deleted_on: {
      "$date": "2023-01-24T11:21:57.992Z"
    },
    updated_at: {
      date: "2023-01-24T11:21:57.992Z"
    },
    created_at: {
      "$date": "2023-01-24T11:19:23.181Z"
    },
  },
  2: {
    id: 2,
    drone_id: "46U6q7WQ",
    name: "Dummy Drone",
    make_name: "cloudsim",
    drone_type: "Real Drone",
    site_id: '',
    mission_id: '',
    deleted_by: "0",
    deleted_on: {
      "$date": "2023-01-24T11:21:57.992Z"
    },
    updated_at: {
      date: "2023-01-24T11:21:57.992Z"
    },
    created_at: {
      "$date": "2023-01-24T11:19:23.181Z"
    },
  },
};

global.missions = {
  1: {
    mission_id: 1,
    name: "mission_1",
    site_id: 1,
    alt: 40,
    speed: 15,
    waypoints: [
      {
        alt: 40,
        lat: 37.42987269786578,
        lng: -122.08320293735657,
      }, {
        alt: 40,
        lat: 37.42987269786578,
        lng: -122.08320293735657,
      }, {
        alt: 40,
        lat: 37.42987269786578,
        lng: -122.08320293735657,
      }],
    created_at: {
      date: "2022-06-02T15:34:06.672Z"
    },
    updated_at: {
      date: "2023-02-03T10:38:22.945Z"
    }
  },
};

app.use(express.json());

app.set('view engine', 'ejs');

// Routes
app.use('/users', users);

// Check connection to server
app.get('/', (req, res) => {
  res.render('index', { message: 'FlytBase drone system!' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});