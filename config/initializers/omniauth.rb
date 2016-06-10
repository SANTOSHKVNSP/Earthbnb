OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '723453382285-cmpsdkv8hjnm8q1386rfatabvlkbuf43.apps.googleusercontent.com', 'ujugPT5ENQlX48G6zSkzUjRV', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
