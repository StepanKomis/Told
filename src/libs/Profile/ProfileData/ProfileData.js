const Database = require("../../Database");
const db = new Database();

class ProfileData {
    constructor(id) {
        this.id = id;
        this.getProfileData();
        this.initializeProfileData(id);
    }

    async initializeProfileData(id) {
        return new Promise(async (resolve, reject) => {
            this.id = id || this.id;
            const profile = await db.select(
                "users",
                ["username", "first_name", "last_name", "bio"],
                "id = " + this.id
            );
            if (profile.length === 0) {
                reject(new Error("User with id " + this.id + " not found"));
            }
            this.username = profile[0].username;
            this.first_name = profile[0].first_name || null; // Corrected typo here
            this.last_name = profile[0].last_name || null;
            this.bio = profile[0].bio || null;

            resolve(profile);
        });
    }

    async getProfileData() {
        try {
            const profile = await db.select(
                "users",
                ["username", "first_name", "last_name", "bio"],
                "id = " + this.id
            );
            if (profile.length === 0) {
                reject(new Error("User with id " + this.id + " not found"));
            }
            this.username = profile[0].username;
            this.first_name = profile[0].first_name || null; // Corrected typo here
            this.last_name = profile[0].last_name || null;
            this.bio = profile[0].bio || null;
            const data = {
                id: this.id,
                username: profile[0].username,
                first_name: profile[0].first_name || null, // Corrected typo here
                last_name: profile[0].last_name || null,
                bio: profile[0].bio || null,
            };
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ProfileData;
