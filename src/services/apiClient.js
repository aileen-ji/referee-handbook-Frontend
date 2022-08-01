import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "my_token"
        this.currCourse = null
        this.currCourseName = "current_course"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    setCurrCourse(currCourse){
        this.currCourse = currCourse
        localStorage.setItem(this.currCourseName, currCourse)
    }

    async request({endpoint, method = `GET`, data = {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }


        if(this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }



        try{
            const res = await axios({ url, method, data, headers })
            return {data: res.data, error: null}
        }
        catch (error) {
            console.error({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }

    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }

    async signupUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }

    async fetchBeginnerCourses() {
        return await this.request({endpoint: `learning`, method: `GET`, data:null})
    }

    async fetchBeginnerCourseByName(name) {
        return await this.request({endpoint: `learning/${name}/beginner`, method: `GET`})
    }

    async createUserCourse(course, sportName) {
        return await this.request({endpoint: `learning/${sportName}`, method: `POST`, data: course})
    }

    async listUserCoursesBySport(sportName) {
        return await this.request({endpoint: `learning/${sportName}`, method: `GET`})
    }

    async listUserOwnedObjectsByUser() {
        return await this.request({endpoint: `profile`, method: `GET`})
    }


    async listUserCourseById(sportName, courseId) {
        return await this.request({endpoint: `learning/${sportName}/userCreated/${courseId}`, method: `GET`})
    }



    async followTeam(team, sportName, teamId) {
        return await this.request({endpoint: `home/${sportName}/${teamId}`, method: `POST`, data: team})
    }

    async getTeams(sportName) {
        return await this.request({endpoint: `sports/${sportName}/teams`, method: `GET`})
    }

    async getRecentGame(sportName){
        return await this.request({endpoint: `sports/${sportName}/recentGame`, method: `GET`})
    }

    async getNews(sportName){
        return await this.request({endpoint: `sports/${sportName}/news`, method: `GET`})
    }

    async getTeamDetail(sportName, teamId){
        return await this.request({endpoint: `sports/${sportName}/${teamId}`, method: `GET`})
    }

    async getTeamStats(sportName, teamId){
        return await this.request({endpoint: `sports/${sportName}/${teamId}/stats`, method: `GET`})
    }

    async getTeamGames(sportName, teamId){
        return await this.request({endpoint: `sports/${sportName}/${teamId}/games`, method: `GET`})
    }

}

export default new ApiClient("http://localhost:3001")