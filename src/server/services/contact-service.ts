/**
 * Class to handle contact service.
 * Service is reponsible for alerting the support team.
 */
class ContactService {
  /**
   * Send an email to the support team.
   * @param {string} email
   * @param {string} message
   * @param {Array<string>} recipients Support team email addresses
   */
  sendEmail(email: string, message: string, recipients: Array<string>) {
    console.log(
      `Sending email to support team from ${email} with message ${message}`
    );
  }

  /**
   * Alert the support team on third party apps e.g. slack.
   *
   */
  alertSupportTeam() {
    console.log("Alerting support team on slack");
  }
}

export default ContactService;
