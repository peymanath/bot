const app = require("express")();
const bodyParser = require("body-parser")
const axios = require("axios")


// fot parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
))

//This is the route the API will call
app.post("/new-message", function ({ body: { message } }, res) {
    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message || message.text.toLowerCase().indexOf("marco") < 0) {
        // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
        return res.end()
    }

    console.log({ message });


    // If we've gotten this far, it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
    axios
        .post(
            "https://api.telegram.org/6887591559:AAEXThEecyGQGGlbzzhjRhjMEXAqN-futJw/sendMessage",
            {
                chat_id: message.chat.id,
                text: "Polo!!",
            }
        )
        .then((response) => {
            // We get here if the message was successfully posted
            console.log("Message posted")
            res.end("ok")
        })
        .catch((err) => {
            // ...and here if it was not
            console.log("Error :", err)
            res.end("Error :" + err)
        })

})

// Finally, start our server
app.listen(3000, function () {
    console.log("Telegram app listening on port 3000!")
})
