const fs = require('fs');
const fetch = require('node-fetch')

async function sync() {
    // Fetch Projects
    const request1 = await fetch('https://admin.dclstudios.org/items/projects?limit=10000')
    const projects = await request1.json()
    fs.writeFileSync('./_data/projects.json', JSON.stringify(projects.data))

    // Fetch Profiles
    const request2 = await fetch('https://admin.dclstudios.org/items/profile?limit=500')
    const profiles = await request2.json()

    // Attach projects to profiles
    profiles.data.forEach(profile => {
        profile.projects = projects.data.filter(p => p.profile == profile.id)
    })

    fs.writeFileSync('./_data/profiles.json', JSON.stringify(profiles.data))
}

sync();