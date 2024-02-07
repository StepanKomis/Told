const ProfileData = require("./ProfileData/ProfileData");
class Profile {
    constructor(id) {
        this.id = id;
        this.username = null;
        this.first_name = null;
        this.last_name = null;
        this.bio = null;
        this.joined = null;

        this.initializeProfileData();
    }

    /**
     * Initializes the user's data
     */
    async initializeProfileData() {
        const profile = await new ProfileData(this.id).getProfileData();
        try {
            this.username = profile.username;
            this.first_name = profile.first_name || null;
            this.last_name = profile.last_name || null;
            this.bio = profile.bio || null;
            this.joinedAt = profile.joinedAt;
        } catch (error) {
            console.error(error.message);
        }
    }
    getProfileData() {
        return {
           username: this.username,
           first_name: this.firsrst_name,
           last_name: this.last_name,
           bio: this.bio,
           joinedAt: this.joinedAt
        }
    }
}

module.exports = Profile;