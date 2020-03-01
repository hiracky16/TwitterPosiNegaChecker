import dotenv from 'dotenv'
import {
  Client
} from 'node-rest-client'

dotenv.config()

const ACCESS_TOKEN_URL = 'https://api.ce-cotoha.com/v1/oauth/accesstokens'
const BASE_URL = 'https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment'
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const client = new Client()
client.registerMethod("getAccessToken", ACCESS_TOKEN_URL, "POST");
client.registerMethod("analyze", BASE_URL, "POST");

export const postSentiment = async (sentence) => {
  const token = await getToken()
  return new Promise(function (resolve) {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", BASE_URL, false)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.setRequestHeader("Authorization", `Bearer ${token}`)
    xhr.onload = function () {
      const data = JSON.parse(xhr.response)
      resolve(data)
    }
    xhr.onerror = function () {
      console.log("error")
    }
    xhr.send(JSON.stringify({
      sentence: sentence
    }))
  })
}

const getToken = () => {
  const data = {
    grantType: "client_credentials",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
  }
  const args = {
    data: data,
    headers: {
      "Content-Type": "application/json"
    }
  }
  return new Promise(function (resolve) {
    client.methods.getAccessToken(args, (data, res) => {
      resolve(data.access_token)
    })
  })
}