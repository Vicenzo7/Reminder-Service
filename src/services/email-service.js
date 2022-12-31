const sender = require("../config/email-config");

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    // const response = await sender.sendMail({
    //   from: mailFrom,
    //   to: mailTo,
    //   subject: mailSubject,
    //   text: mailBody,
    // });
    // console.log(response);

    sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendBasicEmail,
};

/**
 * SMTP -> a@borrows.com
 * receiver -> d@emits.com
 *
 * from: support@noti.com
 */
