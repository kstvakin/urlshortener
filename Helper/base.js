const AssistantV2 = require("ibm-watson/assistant/v2");
const assistant = new AssistantV2({
  iam_apikey: "bP9tH1mPwFA4htDf1msThL7O3cag0FLHxWmJ4FHiJ9ZW",
  url: "https://gateway-lon.watsonplatform.net/assistant/api",
  version: "2019-02-28",
});
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
const currpath = path.join(__dirname, "Logs");

function greetingsMessage(message, session_id, socket) {
  var payload = {
    assistant_id: "109e7197-6290-41ee-b869-76d5fb429d97",
    session_id: session_id,
    input: message,
  };

  assistant
    .message(payload)
    .then((res) => {
      console.log(res.output.generic)
      socket.emit("watson_response", res.output.generic);
      socket.emit("sessionId", session_id);
      /*res.output.generic.map((el) => {
        if (el.response_type !== "option") {
          writeToFile(`${currpath}/${session_id}.txt`, `\nEVA:${el.text}`);
        } else {
          var i;
          var log_text = "";
          for (i = 0; i < el.options.length; i++) {
            log_text =
              log_text + `(${i + 1})\t` + el.options[i].value.input.text + "\t";
          }
          writeToFile(`${currpath}/${session_id}.txt`, `\nEVA:${log_text}`);
        }
        return true;
      });*/
    })
    .catch((err) => {
      console.log(`Watson error 1:${err}`);
      socket.emit("watson_response", false);
    });
}

function watsonMessage(message, session_id, socket) {
  var payload = {
    assistant_id: "109e7197-6290-41ee-b869-76d5fb429d97",
    session_id: session_id,
    input: message,
  };

  console.log(payload)

  assistant
    .message(payload)
    .then((res) => {
      console.log(res.output.generic);
      socket.emit("watson_response", res.output.generic);
      /*res.output.generic.map((el) => {
        if (el.response_type !== "option") {
          writeToFile(`${currpath}/${session_id}.txt`, `\nEVA:${el.text}`);
        } else {
          var i;
          var log_text = "";
          for (i = 0; i < el.options.length; i++) {
            log_text =
              log_text + `(${i + 1})\t` + el.options[i].value.input.text + "\t";
          }
          writeToFile(
            `${currpath}/${sessionStorage.getItem("session_id")}.txt`,
            `\nEVA:${log_text}`
          );
        }
      });*/
    })
    .catch((err) => {
      console.log(`Watson error 2:${err}`);
      socket.emit("watson_response", false);
    });
}

function writeToFile(filename, content) {
  fs.appendFileSync(filename, content, (err) => {
    if (err) throw err;
    //console.log("updated");
  });
}

function Mail(mailOptions) {
  var transporter = nodemailer.createTransport({
    host: "smtp.falconide.com",
    secure: true,
    port: 465,
    auth: {
      user: "spectranetng",
      pass: "Mk*spc8#",
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

function Response(params) {
  return {
    msg: {
      status: params.status,
      data: {
        name: params.name,
        phone: params.phone,
        email: params.email,
        session_id: params.sessid,
      },
    },
  };
}

module.exports = {
  greetingsMessage,
  writeToFile,
  watsonMessage,
  Mail,
  Response,
};
