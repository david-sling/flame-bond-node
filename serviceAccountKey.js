const { private_key_id, private_key, client_email, client_id } = process.env;

module.exports = {
  type: "service_account",
  project_id: "react-firebase-cms-ac2fb",
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uexcu%40react-firebase-cms-ac2fb.iam.gserviceaccount.com",
};
