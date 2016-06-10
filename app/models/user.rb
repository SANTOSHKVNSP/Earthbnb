class User < ActiveRecord::Base

  attr_reader :password

  after_initialize :ensure_session_token

  validates :session_token, :email, presence: true, uniqueness: true
  validates :password_digest, :name, :species, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_attached_file :image,
    :styles => {
      :nav => "30x30#",
      :show => "90x90#",
      :full => "230x230#"
    },
    default_url: "default_alien_:style.jpg"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def self.find_by_email_address(email)
    user = User.find_by_email(email)
    if user.nil?
      return nil
    else
      return user
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(google_uid: auth_hash[:uid])
      if user.nil?
        user = User.create!(google_uid: auth_hash[:uid],
                            name: auth_hash[:info][:first_name],
                            species: "Human",
                            email: auth_hash[:info][:email],
                            password_digest: SecureRandom.urlsafe_base64(16)
                            )
      end
    user
  end

  def self.check_password(user, password)
    user.is_password?(password) ? true : false
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
