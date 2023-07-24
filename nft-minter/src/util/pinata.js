require("dotenv").config()

const axios = require("axios")

export const pinJSONToIPFS = async (formdata) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

  return axios
    .post(url, formdata, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNWExNTI4NS03NmFlLTQ4MDEtOWJmMC1hY2M1YTJhODMyYjkiLCJlbWFpbCI6Ino2NDkzMTk4MzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImEwOTYxYTQwZGU4YTY5YmJkMzMxIiwic2NvcGVkS2V5U2VjcmV0IjoiZDA2ZmU2ZmRmZjZlMzJjOGY4OTc1MjE0NTliOTYwNjVmZjQxNWViNjhjNjI1YjBiYWRkYjA5OTM3ZmMzYmM1ZiIsImlhdCI6MTY4OTc1NzQ2Mn0.fEBahcF91nZKCB2wQNbogEMeHjalwalN8wf-EilVJCM`,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
