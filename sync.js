const { profile } = require('console');
const fs = require('fs');
const fetch = require('node-fetch')

async function sync() {
    // Fetch Projects
    const request1 = await fetch('https://admin.dclstudios.org/items/projects?limit=10000')
    const projects = await request1.json()
    
    // Fetch Profiles
    const request2 = await fetch('https://admin.dclstudios.org/items/profile?limit=500')
    const profiles = await request2.json()
    
    // Attach profiles info to projects
    projects.data.forEach(project => {
        const prof = profiles.data.filter(p => p.id == project.profile)[0]
        if(!prof) {
            project.profile = null
        } else {
            project.profile_name = prof.name
            project.profile_slug = prof.slug
            project.profile_logo = prof.logo
        }
    })
    projects.data = projects.data.filter(p => p.profile != null)
    fs.writeFileSync('./_data/projects.json', JSON.stringify(projects.data))

    // Attach projects to profiles
    profiles.data.forEach(profile => {
        profile.projects = projects.data.filter(p => p.profile == profile.id)
    })

    fs.writeFileSync('./_data/profiles.json', JSON.stringify(profiles.data))
}

sync();