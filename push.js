const router = require("express").Router()
const webpush = require("web-push")

webpush.setGCMAPIKey('AIzaSyAR1DqaVkkjMcMFzDW3zk0_pwxJpG431Nk')
webpush.setVapidDetails(
  "mailto:haffez23@gmail.com",
  'BE1NB8R5X5JItmRYPdiE9C1UoTmlJknzxsZIykUoa3Xzazpzq1ervf6gtPXVjNVw_2lYDHMdGWRFRzqmKSLU6C0',
  'pLDyVtJAJ2Lpn05h5buBYDPGfR-YflsN4gkJvhv8zJ0'
)

const testData = {
    title: "Testing",
    body: "It's a success!",
    icon: ""
  }
  
  let subscription
  let pushIntervalID
  
  router.post("/register", (req, res, next) => {
    subscription = req.body
    console.log(subscription)
    res.sendStatus(201)
    pushIntervalID = setInterval(() => {
      // sendNotification can only take a string as it's second parameter
      webpush.sendNotification(subscription, JSON.stringify(testData))
        .catch(() => clearInterval(pushIntervalID))
    }, 30000)
  })
  
  router.delete("/unregister", (req, res, next) => {
    subscription = null
    clearInterval(pushIntervalID)
    res.sendStatus(200)
  })

module.exports = router
