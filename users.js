const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users_ = [
    {
        id: 1,
        username: 'user1',
        password: 'password123',
    },
];

// Middleware to authenticate a request
function authenticateUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token not found' });
    }

    jwt.verify(token, global.secretKey, (err, user) => {
        if (err || !global.users[user.user_id]) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user_id = user.user_id;
        next();
    });
}


/*
    Manage user
*/

// Register a user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userId = global.nextUserId;

    // Create a new user and store it in the users object
    const newUser = {
        user_id: userId,
        username: username,
        password: password,
        sites: [],
        drones: []
    };
    global.nextUserId++;
    global.users[userId] = newUser;
    res.status(200).json(newUser);
});

// Login a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the users object
    let user;

    for (let userId in global.users) {
        if (global.users[userId].username === username) {
            user = global.users[userId];
            break;
        }
    }

    // User not found or password doesn't match
    if (!user || password != user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate and send the JWT token
    const token = jwt.sign({ user_id: user.user_id }, global.secretKey);

    res.json({ token: token, username: username, drones: user.drones });
});

// Get users list
router.get('/users', authenticateUser, (req, res) => {
    res.json({ users: global.users });
});


/*
    Manage sites
*/

// Get sites list
router.get('/sites', authenticateUser, (req, res) => {
    res.status(200).json(global.sites);
});

// Add site to user's account
router.put('/sites/add/:siteId', authenticateUser, (req, res) => {
    const { siteId } = req.params;
    const userId = req.user_id;
    const site = global.sites[siteId];

    if (site) {
        if (global.users[userId].sites.indexOf(siteId) == -1) {
            global.users[userId].sites.push(siteId);
        } else {
            res.status(404).json({ error: 'Site already added' });
        }
        res.status(200).json(global.users[userId]);
    } else {
        res.status(404).json({ error: 'Site not found' });
    }
});

// Update a site
router.post('/sites/update/:siteId', authenticateUser, (req, res) => {
    const { siteId } = req.params;
    const userId = req.user_id;
    const updatedSite = req.body.site;
    const site = global.sites[siteId];

    if (site && global.users[userId].sites.indexOf(siteId) >= 0) {
        global.sites[siteId] = updatedSite;
        res.status(200).json(global.sites[siteId]);
    } else {
        res.status(404).json({ error: 'Site not found' });
    }
});

// Delete a site from user's account
router.delete('/sites/delete/:siteId', authenticateUser, (req, res) => {
    const { siteId } = req.params;
    const userId = req.user_id;

    let userSites = global.users[userId].sites;
    const siteIndex = userSites.indexOf(siteId);
    if (siteIndex !== -1) {
        userSites.splice(siteIndex, 1);
        global.users[userId].sites = userSites;
        res.status(200).json(global.users[userId]);
    } else {
        res.status(404).json({ error: 'Site not found' });
    }
});

// Retrieve drones at a site
router.get('/sites/:siteId/drones', (req, res) => {
    const { siteId } = req.params;
    const siteDrones = global.sites[siteId].drones;

    let drones = [];

    for (let droneId of siteDrones) {
        drones.push(global.drones[droneId]);
    }

    res.status(200).json(drones);
});

// Retrieve missions for a site
router.get('/sites/:siteId/missions', (req, res) => {
    const { siteId } = req.params;
    const siteMissions = global.sites[siteId].missions;

    let missions = [];

    for (let missionId of siteMissions) {
        missions.push(global.missions[missionId]);
    }

    res.status(200).json(missions);
});


/*
    Manage Drones
*/

// Add drone to a site
router.put('/sites/:siteId/drones/add/:droneId', (req, res) => {
    const { siteId, droneId } = req.params;

    const drone = global.drones[droneId];
    const prevSiteId = drone.site_id;
    const newSite = global.sites[siteId];
    if (drone && newSite) {
        // Remove drone from previous site
        if (prevSiteId) {
            let prevSiteDrones = global.sites[prevSiteId].drones;
            let droneIndex = prevSiteDrones.indexOf(droneId);
            if (droneIndex >= 0) {
                prevSiteDrones.splice(droneIndex, 1);
                global.sites[prevSiteId].drones = prevSiteDrones;
            }
        }
        // Add drone to new site
        newSite.drones.push(droneId);
        global.sites[siteId] = newSite;

        // Update drone's current site
        drone.site_id = siteId;
        res.status(200).json(drone);
    } else {
        res.status(404).json({ error: 'Drone or site not found' });
    }
});

// Delete drone from a site
router.delete('/sites/:siteId/drones/delete/:droneId', (req, res) => {
    const { siteId, droneId } = req.params;

    const siteDrones = global.sites[siteId].drones;

    const droneIndex = siteDrones.indexOf(droneId);
    if (droneIndex !== -1) {
        siteDrones.splice(droneIndex, 1);
        global.sites[siteId].drones = siteDrones;
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'Drone not found' });
    }
});


/*
    Manage missions
*/

// Add mission to the site
router.put('/sites/:siteId/missions/add/:missionId', (req, res) => {
    const { siteId, missionId } = req.params;

    if (global.missions[missionId].site_id == siteId) {
        let siteMissions = global.sites[siteId].missions;
        if (siteMissions.indexOf(missionId) == -1) {
            siteMissions.push(missionId);
            global.sites[siteId].missions = siteMissions;
        }
        res.status(200).json(global.sites[siteId]);
    } else {
        res.status(404).json({ error: 'Mission cannout be assigned to the site' });
    }
});

// Remove mission from it's site
router.delete('/sites/:siteId/missions/delete/:missionId', (req, res) => {
    const { siteId, missionId } = req.params;

    let siteMissions = global.sites[siteId].missions;

    const missionIndex = siteMissions.indexOf(missionId);
    if (missionIndex !== -1) {
        siteMissions.splice(missionIndex, 1);
        global.sites[siteId].missions = siteMissions;
        res.status(200).json(global.sites[siteId]);
    } else {
        res.status(404).json({ error: 'Mission not found' });
    }
});

module.exports = router;
