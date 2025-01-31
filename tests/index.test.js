const { default: axios } = require("axios");

function sum(a, b) {
    return a + b
}

const BACKEND_URL = "http://localhost:3000"

describe("Authentication", () => {
    test('User is able to sign up only once', async () => {
        const username = "Priyanshu" + Math.random();
        const password = "123456"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(response.statusCode).toBe(200)

        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(updatedResponse.statusCode).toBe(400)
    })

    test('Signup request fails if the username is empty', async () => {
        const username = `Priyanshu-${Math.random()}`
        const password = "123456"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            password
        })

        expect(response.statusCode).toBe(400)
    })

    test('Signin succeds if the username and password are correct', async () => {
        const username = `Priyanshu-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toBeDefined()
    })

    test('Signin fails if the username and password are incorrect', async () => {
        const username = `Priyanshu-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: "WrongUsername",
            password
        })

        expect(response.statusCode).toBe(403)
    })
})


describe("User metadata endpoints", () => {

    let token = ""
    let avatarid = ""
    beforeAll(async () => {
        const username = `Priyanshu-${Math.random()}`
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })

        token = response.data.token

        const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
            imageUrl: "jdjfdjfladjflaj",
            name: "Timmy"
        })

        avatarId = avatarResponse.data.avatarId
    })

    test('User cant update their metadata with wrong avatar id', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId: "123123"
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(400)
    })

    test('User can update their metadata with right avatar id', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(200)
    })

    test('User is not able to update their metadata if the auth header is not present', async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(403)
    })
})


describe("User avatar information", () => {
    let avatarId;
    let token;
    let userId

    beforeAll(async () => {
        const username = `Priyanshu-${Math.random()}`
        const password = "123456"

        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        userId = signupResponse.data.userId

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })

        token = response.data.token

        const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
            imageUrl: "jdjfdjfladjflaj",
            name: "Timmy"
        })

        avatarId = avatarResponse.data.avatarId
    })

    test("Get back avatar information for a user", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`)

        expect(response.data.avatars.length).toBe(1)
        expect(response.data.avatars[0].userId).toBe(userId)
    })

    test("Available avatars lists the recently created avatar", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`)

        expect(response.data.avatars.length).not.toBe(0)
        const currentAvatar = response.data.avatars.find(x => x.id == avatarId)
        expect(currentAvatar).toBeDefined()
    })
})

describe("Space information", () => {
    let mapId;
    let element1Id;
    let element2Id;
    let adminToken;
    let adminId;
    let userToken;
    let userId;

    beforeAll(async () => {
        const username = `Priyanshu-${Math.random()}`
        const password = "123456"

        const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })



        adminId = signupResponse.data.userId

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })

        adminToken = response.data.token


        const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username: username + "-user",
            password,
            type: "user"
        })



        userId = userSignupResponse.data.userId

        const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username: username + "-user",
            password
        })

        userToken = userSigninResponse.data.token

        const element1 = await axios.post(`${BACKEND_URL}/api/v1/element`, {
            imageUrl: "jdfjl",
            width: 1,
            height: 1,
            static: true
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })

        const element2 = await axios.post(`${BACKEND_URL}/api/v1/element`, {
            imageUrl: "jdfjl",
            width: 1,
            height: 1,
            static: true
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })

        element1Id = element1.id
        element2Id = element2.id


        const map = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            "thumbnail": "https://thumbnail.com/a.png",
            "dimensions": "100x200",
            "name": "100 person interview room",
            "defaultElements": [{
                elementId: element1Id,
                x: 20,
                y: 20
            }, {
                elementId: element1Id,
                x: 18,
                y: 20
            }, {
                elementId: element2Id,
                x: 19,
                y: 20
            },
            ]
        }, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })

        mapId = map.id
    })

    test("User is able to create a space", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimension": "100x200",
            "mapId": mapId
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        expect(response.data.spaceId).toBeDefined()
    })

    test("User is able to create a space without mapId (empty space)", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimension": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        expect(response.data.spaceId).toBeDefined()
    })

    test("User is not able to create a space without mapId and dimensions ", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        expect(response.statusCode).toBe(400)
    })

    test("User is not able to delete a space that doesnt exist", async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/space/randomIdDoesntExist`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        expect(response.statusCode).toBe(400)
    })

    test("User is  able to delete a space that does exist", async () => {

        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimension": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        expect(deleteResponse.statusCode).toBe(200)
    })

    test("User should not be able to delete a space created by another user", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            "name": "Test",
            "dimension": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`, {
            headers: {
                authorization: `Bearer ${adminToken}`
            }
        })

        expect(deleteResponse.statusCode).toBe(400)
    })

    test("Admin has no spaces initially", async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }

        });
        expect(response.data.spaces.length).toBe(0)
    })

    test("Admin has no spaces initially", async () => {
        const spaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space/all`, {
            "name": "Test",
            "dimension": "100x200",
        }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }

        });

        const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }

        });
        const filteredSpace = response.data.spaces.find(x => x.id == spaceCreateResponse.spaceId)
        expect(response.data.spaces.length).toBe(1)
        expect(filteredSpace).toBeDefined()
    })
})