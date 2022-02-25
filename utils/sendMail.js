const transporter = require('./mailTransporter');
const { welcomeTemplate } = require('./mailTemplates');

const mailOptions = {
	from: 'dev.manavpatnaik@gmail.com'
};

const sendMail = (to, subject, template) => {
	mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = template
	transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
			console.log('Error ' + err);
		} else {
			console.log('Email sent successfully');
		}
	});
};

const sendWelcomeMail = (to, name) => {
	const html = welcomeTemplate(name);
	sendMail(to, 'Welcome to FPR!', html);
};

exports.sendWelcomeMail = sendWelcomeMail;
