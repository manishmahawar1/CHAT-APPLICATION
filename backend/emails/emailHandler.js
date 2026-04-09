import { resendClient, sender } from "../lib/resend.js"
import createWelcomeEmailTemplate from "./emailTemplates.js"


const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: [email],
        subject: "Welcome to Chat-App",
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if (error) {
        console.error(error.message);
        throw new Error("Failed to send welcome email");
    }
    console.log("welcome email sent successfully", data);

}

export default sendWelcomeEmail;